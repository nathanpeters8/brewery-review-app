class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def results
    # @data = {query: params{:query}}.to_json
    @query_params = request.query_parameters.to_json.html_safe
    render 'results'
  end

  def brewery
    @data = {id: params{:id}}.to_json
    render 'brewery'
  end

  def account
    render 'account'
  end
end
