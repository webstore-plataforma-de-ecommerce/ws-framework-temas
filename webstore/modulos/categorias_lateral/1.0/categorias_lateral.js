$(document).ready(function(){
	try{
		isReady("objetos.CategoriasLista", "CategoriaLateral()");
	} catch (e) { console.log(e.message); }
});

function CategoriaLateral() {
    try {
        var registro = [];
        var obj = jQuery.parseJSON(objetos.CategoriasLista);
        var departamento = obj.Categorias;
        var DepartamentosLateral = Departamentos(departamento, 0, registro);
        $('#departamentos-lateral').append(DepartamentosLateral);
        if (typeof call_after_categoria_lateral !== 'undefined') { try { eval(call_after_categoria_lateral); } catch (e) { console.log("Falha call_after_categoria_lateral" + e.message); } }
    } catch (e) {
        console.log("Falha Categorias Lateral:" + e.message);
    }
}