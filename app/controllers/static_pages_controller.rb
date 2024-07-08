class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def results
    @data = {query: params{:query}}.to_json
    render 'results'
  end

  def brewery
    render 'brewery'
  end
end
