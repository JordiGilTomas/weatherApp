(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['ciudadesSelect.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <li value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":3,"column":15},"end":{"line":3,"column":21}}}) : helper)))
    + "\">\r\n        <span class=\"li-ciudad-locationIcon\">\r\n            <i class=\"icon-placepin\"></i>\r\n        </span>\r\n        <span class=\"li-ciudad\">\r\n            <span class=\"li-ciudad-nombre-container\">\r\n                <span class=\"li-ciudad-nombre\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"ciudad") || (depth0 != null ? lookupProperty(depth0,"ciudad") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ciudad","hash":{},"data":data,"loc":{"start":{"line":9,"column":47},"end":{"line":9,"column":57}}}) : helper)))
    + "</span>\r\n                <span class=\"li-ciudad-continente\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"continente") || (depth0 != null ? lookupProperty(depth0,"continente") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"continente","hash":{},"data":data,"loc":{"start":{"line":10,"column":51},"end":{"line":10,"column":65}}}) : helper)))
    + "</span>\r\n            </span>\r\n            <span class=\"li-ciudad-comunidad-container\">\r\n                <span class=\"li-ciudad-comunidad\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"comunidad") || (depth0 != null ? lookupProperty(depth0,"comunidad") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comunidad","hash":{},"data":data,"loc":{"start":{"line":13,"column":50},"end":{"line":13,"column":63}}}) : helper)))
    + ",</span>\r\n                <span class=\"li-ciudad-provincia\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"provincia") || (depth0 != null ? lookupProperty(depth0,"provincia") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"provincia","hash":{},"data":data,"loc":{"start":{"line":14,"column":50},"end":{"line":14,"column":63}}}) : helper)))
    + "</span>\r\n            </span>\r\n\r\n        </span>\r\n        <span class=\"li-ciudad-bandera\">\r\n            <img src=\"https://www.tiempo.com/css/2018/icons/banderas18/"
    + alias4(((helper = (helper = lookupProperty(helpers,"pais") || (depth0 != null ? lookupProperty(depth0,"pais") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pais","hash":{},"data":data,"loc":{"start":{"line":19,"column":71},"end":{"line":19,"column":79}}}) : helper)))
    + ".svg\" alt=\"\">\r\n        </span>\r\n        </li>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<ul id=\"ciudadUl\" class=\"ciudadUl\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"ciudadesEncontradas") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":22,"column":9}}})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});
})();