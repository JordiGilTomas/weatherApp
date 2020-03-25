(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['weatherWidget.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <div>\r\n        <p class=\"bold700\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nombreDia") || (depth0 != null ? lookupProperty(depth0,"nombreDia") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nombreDia","hash":{},"data":data,"loc":{"start":{"line":66,"column":27},"end":{"line":66,"column":40}}}) : helper)))
    + "</p>\r\n        <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"diaAndMes") || (depth0 != null ? lookupProperty(depth0,"diaAndMes") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"diaAndMes","hash":{},"data":data,"loc":{"start":{"line":67,"column":11},"end":{"line":67,"column":24}}}) : helper)))
    + "</p>\r\n        <img src=\"icons/tiempo/"
    + alias4(((helper = (helper = lookupProperty(helpers,"tiempoIcono") || (depth0 != null ? lookupProperty(depth0,"tiempoIcono") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tiempoIcono","hash":{},"data":data,"loc":{"start":{"line":68,"column":31},"end":{"line":68,"column":46}}}) : helper)))
    + ".svg\" alt=\"\" class=\"weekWeatherIcon\">\r\n        <img class=\"week-weather-paraguas\" src=\"icons/lluvia/paraguas.png\" alt=\"\">\r\n        <p> "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"lluvia") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":70,"column":12},"end":{"line":73,"column":19}}})) != null ? stack1 : "")
    + "        </p>\r\n\r\n        <p class=\"week-today-rangoTemperatura bold\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"temperaturaMaxima") || (depth0 != null ? lookupProperty(depth0,"temperaturaMaxima") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"temperaturaMaxima","hash":{},"data":data,"loc":{"start":{"line":76,"column":52},"end":{"line":76,"column":73}}}) : helper)))
    + "° / "
    + alias4(((helper = (helper = lookupProperty(helpers,"temperaturaMinima") || (depth0 != null ? lookupProperty(depth0,"temperaturaMinima") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"temperaturaMinima","hash":{},"data":data,"loc":{"start":{"line":76,"column":77},"end":{"line":76,"column":98}}}) : helper)))
    + "°</p>\r\n        <img src=\"icons/viento/"
    + alias4(((helper = (helper = lookupProperty(helpers,"vientoIcono") || (depth0 != null ? lookupProperty(depth0,"vientoIcono") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"vientoIcono","hash":{},"data":data,"loc":{"start":{"line":77,"column":31},"end":{"line":77,"column":46}}}) : helper)))
    + ".png\" alt=\"\" class=\"weekWindIcon\">\r\n        <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"vientoKmh") || (depth0 != null ? lookupProperty(depth0,"vientoKmh") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"vientoKmh","hash":{},"data":data,"loc":{"start":{"line":78,"column":11},"end":{"line":78,"column":24}}}) : helper)))
    + "-"
    + alias4(((helper = (helper = lookupProperty(helpers,"vientoRachas") || (depth0 != null ? lookupProperty(depth0,"vientoRachas") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"vientoRachas","hash":{},"data":data,"loc":{"start":{"line":78,"column":25},"end":{"line":78,"column":41}}}) : helper)))
    + "</p>\r\n        <p>km/h</p>\r\n    </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n                "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"lluvia") || (depth0 != null ? lookupProperty(depth0,"lluvia") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"lluvia","hash":{},"data":data,"loc":{"start":{"line":71,"column":16},"end":{"line":71,"column":26}}}) : helper)))
    + " mm\r\n            ";
},"4":function(container,depth0,helpers,partials,data) {
    return " -\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<section class=\"weather\">\r\n    <div class=\"today-weather\">\r\n        <p class=\"today-weather-city block\">El Tiempo en <span>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"weatherToday") : depth0)) != null ? lookupProperty(stack1,"city") : stack1), depth0))
    + "</span></p>\r\n        <div class=\"today-weahter-time\">\r\n                 <p class=\"time bold500\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"weatherToday") : depth0)) != null ? lookupProperty(stack1,"horaActual") : stack1), depth0))
    + ":"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"weatherToday") : depth0)) != null ? lookupProperty(stack1,"minutosActualTwoDigits") : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"weatherToday") : depth0)) != null ? lookupProperty(stack1,"estadoHoraActual") : stack1), depth0))
    + "</p>\r\n                 <span class=\"icons\">\r\n                 <i id=\"heart\" class=\"icon-heart-unselected\"></i>\r\n                 <i id=\"share\" class=\"icon-share\">\r\n                    <div class=\"socialIcons\">\r\n                        <i id=\"facebook\" class=\"icon-social-facebook\"></i>\r\n                        <i id=\"twitter\" class=\"icon-social-twitter\"></i>\r\n                        <i id=\"linkedin\" class=\"icon-social-linkedin\"></i>\r\n                        <i id=\"pinterest\" class=\"icon-social-pinterest\"></i>\r\n                        <i id=\"mail\" class=\"icon-social-mail\"></i>\r\n                        <i id=\"tumblr\" class=\"icon-social-tumblr\"></i>\r\n                        <i id=\"xing\" class=\"icon-social-xing\"></i>\r\n                        <i id=\"print\" class=\"icon-social-print\"></i>\r\n                    </div>\r\n                 </i>\r\n\r\n                 </span>\r\n        </div>\r\n\r\n\r\n        <div class=\"container-today\">\r\n        <img src=\"icons/tiempo/"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"weatherToday") : depth0)) != null ? lookupProperty(stack1,"indexIconoHoraActual") : stack1), depth0))
    + ".svg\" alt=\"\" class=\"todayWeatherIcon\">\r\n        <div class=\"today-weather-container-temperatura\">\r\n            <p class=\"today-weather-temperatura block\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"weatherToday") : depth0)) != null ? lookupProperty(stack1,"temperaturaActual") : stack1), depth0))
    + "<sup class=\"supBig\">o</sup></p>\r\n            <p class=\"today-weather-sensacionTermica\">Sensación de <span class=\"bold700\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"weatherToday") : depth0)) != null ? lookupProperty(stack1,"sensacionTermica") : stack1), depth0))
    + "</span><sup class=\"supSmall bold\">o</sup></span></p>\r\n        </div>\r\n\r\n        <div class=\"today-weather-container-precipitaciones\">\r\n            <div class=\"flexWrap bottom05\">\r\n            <img class=\"paraguas\" src=\"icons/lluvia/paraguas.png\" alt=\"\">\r\n            <div class=\"porcentaje-container\">\r\n                <p class=\"porcentaje block\">Cantidad</p>\r\n                <p class=\"cantidad block\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"weatherToday") : depth0)) != null ? lookupProperty(stack1,"rainCantidad") : stack1), depth0))
    + " mm</p>\r\n            </div>\r\n            </div>\r\n            <div class=\"flexWrap\">\r\n            <img class=\"luna\" src=\"icons/luna/"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"weatherToday") : depth0)) != null ? lookupProperty(stack1,"iconoLuna") : stack1), depth0))
    + ".png\" alt=\"\">\r\n            <div class=\"porcentaje-container\">\r\n                <p class=\"porcentaje block\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"weatherToday") : depth0)) != null ? lookupProperty(stack1,"tipoLuna") : stack1), depth0))
    + "</p>\r\n                <p class=\"cantidad block\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"weatherToday") : depth0)) != null ? lookupProperty(stack1,"descripcionLuna") : stack1), depth0))
    + "</p>\r\n            </div>\r\n            </div>\r\n        </div>\r\n            <div class=\"durante-container\">\r\n                <button class=\"btnDetalle\">i</button>\r\n                <div class=\"durante-container-mayorParte\">\r\n                    <p class=\"durante block bold subrayado\">La mayor parte del día</p>\r\n                    <p class=\"duranteblock \">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"weatherToday") : depth0)) != null ? lookupProperty(stack1,"estadoMayorParteDelDia") : stack1), depth0))
    + "</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"next\">\r\n                <button class=\"btnNext\"><i class=\"icon-arrow-right\"></i></button>\r\n            </div>\r\n        </div>\r\n        <i class=\"copy\">*Datos obtenidos de tiempo.com</i>\r\n        </div>\r\n\r\n<aticle class=\"week-weather\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"weatherWeek") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":64,"column":4},"end":{"line":81,"column":14}}})) != null ? stack1 : "")
    + "</article>\r\n</section>\r\n\r\n";
},"useData":true});
})();