(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['daySelected.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " <div class=\"week-daySelected-hours-hour\">\r\n            <div class=\"week-daySelected-hours-hour-time\">\r\n                <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":5,"column":22},"end":{"line":5,"column":30}}}) : helper)))
    + "</span>\r\n                <img src=\"icons/tiempo/"
    + alias4(((helper = (helper = lookupProperty(helpers,"iconoTime") || (depth0 != null ? lookupProperty(depth0,"iconoTime") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"iconoTime","hash":{},"data":data,"loc":{"start":{"line":6,"column":39},"end":{"line":6,"column":52}}}) : helper)))
    + ".svg\" alt=\"\" class=\"todayWeatherIcon\">\r\n            </div>\r\n            <div class=\"week-daySelected-hours-temp\">\r\n                <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"temp") || (depth0 != null ? lookupProperty(depth0,"temp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"temp","hash":{},"data":data,"loc":{"start":{"line":9,"column":19},"end":{"line":9,"column":27}}}) : helper)))
    + "°</p>\r\n            </div>\r\n             <div class=\"week-daySelected-hours-desc\">\r\n                <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"descTemp") || (depth0 != null ? lookupProperty(depth0,"descTemp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"descTemp","hash":{},"data":data,"loc":{"start":{"line":12,"column":19},"end":{"line":12,"column":31}}}) : helper)))
    + "</p>\r\n                <p>Sensación T. "
    + alias4(((helper = (helper = lookupProperty(helpers,"sensacionTermica") || (depth0 != null ? lookupProperty(depth0,"sensacionTermica") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sensacionTermica","hash":{},"data":data,"loc":{"start":{"line":13,"column":32},"end":{"line":13,"column":52}}}) : helper)))
    + "°</p>\r\n            </div>\r\n            <div class=\"week-daySelected-hours-vientoUV\">\r\n                <img src=\"icons/viento/"
    + alias4(((helper = (helper = lookupProperty(helpers,"iconoViento") || (depth0 != null ? lookupProperty(depth0,"iconoViento") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"iconoViento","hash":{},"data":data,"loc":{"start":{"line":16,"column":39},"end":{"line":16,"column":54}}}) : helper)))
    + ".png\" alt=\"\" class=\"todayWeatherIcon\">\r\n                <div class=\"week-daySelected-hours-vientoUV-desc\">\r\n                    <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"vientoDireccion") || (depth0 != null ? lookupProperty(depth0,"vientoDireccion") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"vientoDireccion","hash":{},"data":data,"loc":{"start":{"line":18,"column":23},"end":{"line":18,"column":42}}}) : helper)))
    + "</p>\r\n                    <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"vientoKmh") || (depth0 != null ? lookupProperty(depth0,"vientoKmh") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"vientoKmh","hash":{},"data":data,"loc":{"start":{"line":19,"column":23},"end":{"line":19,"column":36}}}) : helper)))
    + " - "
    + alias4(((helper = (helper = lookupProperty(helpers,"vientoRachas") || (depth0 != null ? lookupProperty(depth0,"vientoRachas") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"vientoRachas","hash":{},"data":data,"loc":{"start":{"line":19,"column":39},"end":{"line":19,"column":55}}}) : helper)))
    + " km/h</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"week-daySelected-hours-vientoUV\">\r\n                <i class=\"icon-sun\"></i>\r\n                <div class=\"week-daySelected-hours-vientoUV-desc\">\r\n                    <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"uv") || (depth0 != null ? lookupProperty(depth0,"uv") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uv","hash":{},"data":data,"loc":{"start":{"line":25,"column":23},"end":{"line":25,"column":29}}}) : helper)))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"nivel") || (depth0 != null ? lookupProperty(depth0,"nivel") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nivel","hash":{},"data":data,"loc":{"start":{"line":25,"column":30},"end":{"line":25,"column":39}}}) : helper)))
    + "</p>\r\n                    <p>FPS: "
    + alias4(((helper = (helper = lookupProperty(helpers,"fpsMin") || (depth0 != null ? lookupProperty(depth0,"fpsMin") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fpsMin","hash":{},"data":data,"loc":{"start":{"line":26,"column":28},"end":{"line":26,"column":38}}}) : helper)))
    + " - "
    + alias4(((helper = (helper = lookupProperty(helpers,"fpsMax") || (depth0 != null ? lookupProperty(depth0,"fpsMax") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fpsMax","hash":{},"data":data,"loc":{"start":{"line":26,"column":41},"end":{"line":26,"column":51}}}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"week-daySelected-hours-more\">\r\n                <span id="
    + alias4(((helper = (helper = lookupProperty(helpers,"hour") || (depth0 != null ? lookupProperty(depth0,"hour") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hour","hash":{},"data":data,"loc":{"start":{"line":30,"column":25},"end":{"line":30,"column":33}}}) : helper)))
    + ">+</span>\r\n            </div>\r\n</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<h2 class=\"week-daySelected-hours-title\">El tiempo en "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"hour") : depth0)) != null ? lookupProperty(stack1,"0") : stack1)) != null ? lookupProperty(stack1,"city") : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"hour") : depth0)) != null ? lookupProperty(stack1,"0") : stack1)) != null ? lookupProperty(stack1,"nombreDia") : stack1), depth0))
    + " "
    + alias2(((helper = (helper = lookupProperty(helpers,"fecha") || (depth0 != null ? lookupProperty(depth0,"fecha") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias3,{"name":"fecha","hash":{},"data":data,"loc":{"start":{"line":1,"column":91},"end":{"line":1,"column":100}}}) : helper)))
    + "</h2>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"hour") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":33,"column":9}}})) != null ? stack1 : "");
},"useData":true});
})();