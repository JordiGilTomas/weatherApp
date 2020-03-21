(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['weatherWidget.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<section class=\"today\">\r\n    <div class=\"today-weather\">\r\n        <p>El tiempo en <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"city") || (depth0 != null ? lookupProperty(depth0,"city") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"city","hash":{},"data":data,"loc":{"start":{"line":3,"column":30},"end":{"line":3,"column":38}}}) : helper)))
    + "</span></p>\r\n        <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"horaActual") || (depth0 != null ? lookupProperty(depth0,"horaActual") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"horaActual","hash":{},"data":data,"loc":{"start":{"line":4,"column":11},"end":{"line":4,"column":25}}}) : helper)))
    + ":"
    + alias4(((helper = (helper = lookupProperty(helpers,"minutosActualTwoDigits") || (depth0 != null ? lookupProperty(depth0,"minutosActualTwoDigits") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minutosActualTwoDigits","hash":{},"data":data,"loc":{"start":{"line":4,"column":26},"end":{"line":4,"column":52}}}) : helper)))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"estadoHoraActual") || (depth0 != null ? lookupProperty(depth0,"estadoHoraActual") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"estadoHoraActual","hash":{},"data":data,"loc":{"start":{"line":4,"column":53},"end":{"line":4,"column":73}}}) : helper)))
    + "</p>\r\n        <img src=\"icons/tiempo/"
    + alias4(((helper = (helper = lookupProperty(helpers,"indexIconoHoraActual") || (depth0 != null ? lookupProperty(depth0,"indexIconoHoraActual") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"indexIconoHoraActual","hash":{},"data":data,"loc":{"start":{"line":5,"column":31},"end":{"line":5,"column":55}}}) : helper)))
    + ".svg\" alt=\"\" class=\"todayWeather\">\r\n        <div class=\"today-weather-container-temperatura\">\r\n            <p class=\"today-weather-temperatura\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"temperaturaActual") || (depth0 != null ? lookupProperty(depth0,"temperaturaActual") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"temperaturaActual","hash":{},"data":data,"loc":{"start":{"line":7,"column":49},"end":{"line":7,"column":70}}}) : helper)))
    + "o</p>\r\n            <p class=\"today-weather-sensacionTermica\">Sensación de "
    + alias4(((helper = (helper = lookupProperty(helpers,"sensacionTermica") || (depth0 != null ? lookupProperty(depth0,"sensacionTermica") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sensacionTermica","hash":{},"data":data,"loc":{"start":{"line":8,"column":67},"end":{"line":8,"column":87}}}) : helper)))
    + "o</p>\r\n        </div>\r\n\r\n        <div class=\"today-weather-container-precipitaciones\">\r\n            <img src=\"\" alt=\"\">\r\n            <div class=\"porcentaje-container\">\r\n                <p class=\"porcentaje\">Precipitaciones</p>\r\n                <p class=\"cantidad\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"rainCantidad") || (depth0 != null ? lookupProperty(depth0,"rainCantidad") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rainCantidad","hash":{},"data":data,"loc":{"start":{"line":15,"column":36},"end":{"line":15,"column":52}}}) : helper)))
    + " mm</p>\r\n            </div>\r\n            <div class=\"durante-container\">\r\n                <button class=\"detalle\">i</button>\r\n                <p class=\"durante\">La mayor parte del día</p>\r\n                <p class=\"durante\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"estadoMayorParteDelDia") || (depth0 != null ? lookupProperty(depth0,"estadoMayorParteDelDia") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"estadoMayorParteDelDia","hash":{},"data":data,"loc":{"start":{"line":20,"column":35},"end":{"line":20,"column":61}}}) : helper)))
    + "</p>\r\n            </div>\r\n            <div class=\"next\">\r\n                <button>></button>\r\n            </div>\r\n        </div>\r\n        </div>\r\n    </div>\r\n</section>";
},"useData":true});
})();