const socket = io();

const enviarMensaje = () => {
    const author = document.getElementById("author").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const id = document.getElementById("id").value;
    const edad = document.getElementById("edad").value;
    const alias = document.getElementById("alias").value;
    const text = document.getElementById("text").value;
    const avatar = document.getElementById("avatar").value;
    
    const mensaje = { author, nombre, apellido, id, edad,alias, text, avatar  };
    socket.emit('new_message', mensaje);
    return false;
}

const crearEtiquetasMensaje = (mensaje) => {
    const { author, nombre, apellido, id, edad,alias, text, avatar } = mensaje;
    return `
    <div class="p-1">
      <strong class="text-uppercase text-danger">${author}</strong>
      <em class="text-primary">${nombre}</em>
      <em class="text-info ">${apellido}</em>
      <em class="text-danger ">${id}</em>
      <em class="text-primary ">${edad}</em>
      <em class="text-info ">${alias}</em>
      <em class="text-primary ">${avatar}</em>
      <em class="text-danger ">[ ${text} ]</em>
    </div>
  `;
}

const agregarMensajes = (mensajes) => {
    const mensajesFinal = mensajes.map(mensaje => crearEtiquetasMensaje(mensaje)).join(" ");
    document.getElementById("messages").innerHTML = mensajesFinal;
}

socket.on('messages', (messages) => agregarMensajes(messages));

