consideraciones a tener en cuenta:
- 1 dia antes de la entrega, la api de mercadopago sufrió cambios en el comportamiento(no así en la documentación del funcionamiento), 
y como lo explica la siguiente página "https://www.mercadopago.com.ar/developers/panel/app/8146148984937354/credentials/sandbox" solo se 
puede probar el comportamiento de checkoutpro realizando pagos desde una cuenta de prueba a otra, por lo tanto se deberia crear una cuenta de prueba para probar el funcionamiento y usar una de las tarjetas de prueba. alternativamente, proveemos una cuenta y tarjetas de prueba para realizar el pago:

usuario: TESTUSER1724715886
password: jMtKIQxhEW

tarjeta: 5031 7557 3453 0604
codigo: 123
caducidad: 11/25
nombre: APRO

-No sabemos exactamente cual es el comportamiento que se espera del pull request, pero no pudimos lograr que se muestren todos los cambios del 
proyecto en el mismo, por ende hicimos un push extra con el readme para luego hacer el pull request sobre esa branch

- Link a produccion: https://bodine.vercel.app/ 

- bugs conocidos: 
    #1 El navbar no funciona correctamente en producción, el comportamiento deseado es el que se experimenta en un entorno local.
    creemos que el error puede estar relacionado con la caché.

    #2 En la página de compras recibimos unos warnings que se deben a un atributo fixed que tiene el navbar, pero no podemos quitar el fixed ya que desaparece el logo en el scroll.

    #3 Todas las paginas tienen contenido clickeable. No pudimos hacer que no sea clickeable.

observaciones:
    #1 Se decidió que no se puedan cliquear los vinos en la page principal y sea meramente visual.
    #2 Si se intenta acceder a un vino que no existe mediante la url p.e: /vino/id=1700 se recibe una alerta informando que no existe.
    #3 Por recomendación de nuestro ayudante asignado no modelamos las suscripciones en la base de datos, por lo tanto el apartado suscripciones no posee funcionalidades.
    #4 El log para el admin está habilitado en producción, ya que en local hay un error relacionado con el csrf que no pudimos trackear correctamente.

