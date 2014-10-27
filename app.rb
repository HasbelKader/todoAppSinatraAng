require 'rubygems'
require 'sinatra'
require 'data_mapper'
#require 'sinatra/flash'
require 'pony'
require 'json'


class Todo
  DataMapper::setup(:default, "sqlite3://#{Dir.pwd}/app.db")
  include DataMapper::Resource
  property :id, Serial
  property :title, String, :required => true, :default => "No title"
  property :content, Text, :required => true
  property :done, Boolean, :required => true, :default => false
  property :created_at, DateTime
  property :updated_at, DateTime

end

DataMapper.finalize.auto_upgrade!

configure :development do

  set :port, 5000
  set :environment, :productio
  enable :sessions

end

configure :production do
  DataMapper.setup(:default, ENV['DATABASE_URL'])
  set :email_address => 'smtp.sendgrid.net',
      :email_user_name => ENV['SENDGRID_USERNAME'],
      :email_password => ENV['SENDGRID_PASSWORD'],
      :email_domain => 'heroku.com'
end


get '/index.html' do

end

get '/api/getAll' do
  content_type :json
  @todos = Todo.all :order => :updated_at.desc
  @todos.to_json
end

get '/api/getOne/:id' do
  @todo =Todo.get(params[:id]).to_json
end

delete '/api/getOne/:id' do
  n = Todo.get(params[:id])
  n.destroy
end

put '/api/getOne/:id' do
  n = Todo.get(params[:id])
  n.done=true
  n.updated_at = Time.now
  n.save
end


get '/' do
  @todos = Todo.all :order => :updated_at.desc
  @title = "Sinatra Rest API"
  erb :index
end
get '/new' do
  @title = " Create new  - All Notes"
  erb :new
end


get '/:id' do

  @todo =Todo.get(params[:id])

  @title = "Edit todo ##{params[:id]}"
  erb :edit

end


post '/' do
    ob = Todo.new
    ob.content = params[:content]
    ob.title = params[:title]
    ob.created_at = Time.now
    ob.updated_at = Time.now
    ob.done =false
    ob.save

    redirect '/'
  end


post '/api/add' do
  params.merge! JSON.parse(request.env["rack.input"].read)

  ob = Todo.new
  ob.content = params[:content]
  ob.title = params[:title]
  ob.created_at = Time.now
  ob.updated_at = Time.now
  ob.done =false

  ob.save

end


  put '/:id' do

    n = Todo.get params[:id]
    n.content = params[:content]
    n.done = params[:done] ? 1 : 0
    n.updated_at = Time.now
    n.save
    redirect '/'

  end

put '/api/:id/:done' do

  n = Todo.get params[:id]

  n.done = params[:done]
  n.updated_at = Time.now
  n.save


end

  get '/:id/delete' do

    @todo = Todo.get params[:id]
    @title = "Confirm deletion of todo ##{params[:id]}"
    erb :delete
  end

  delete '/:id' do
    n = Todo.get(params[:id])
    n.destroy
    redirect '/'
  end





