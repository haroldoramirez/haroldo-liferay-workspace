<%@ include file="/init.jsp" %>

    <app-start-portlet></app-start-portlet>

    <script data-senna-track="temporary">
        (function () {
            var mainScriptUrl = '<%= request.getContextPath() %>/dist/main.js';
            if (window.mountStartPortlet) {
                window.mountStartPortlet();
            } else {
                import(mainScriptUrl).then(function () {
                    if (window.mountStartPortlet) {
                        window.mountStartPortlet();
                    }
                }).catch(function (err) {
                    console.error('Falha ao importar o bundle Angular:', err);
                });
            }
        })();
    </script>