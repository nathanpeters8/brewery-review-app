class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def results
    @data = {query: params{:query}}.to_json
    render 'results'
  end

  def brewery
    @data = {id: params{:id}}.to_json
    render 'brewery'
  end
end
