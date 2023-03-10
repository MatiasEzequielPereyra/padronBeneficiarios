 //unica funcion para convertir el archivo csv con el formato de padron , a .txt con el formato de texto.
 function convert() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];
    const reader = new FileReader();



//Cuando termina de cargar el archivo de input  -->
    reader.onload = function(event) {
        const csvText = event.target.result;
        const lines = csvText.split('\n');
        let txtText = '';

//arranca de la fila 6 indice 5 del archivo de exel o csv.
        for (let i = 5; i < lines.length; i++) {
  //separa las columnas por cada ';'.
  const columns = lines[i].split(';');
  // se asegura que haya al menos 4 columnas-
  if (columns.length >= 4) {
            
            const lastnameAndName = columns[0].trim().slice(0,39).replace(/\s+/g, ' '); // regex saca espacios del nombre y setea en maximo 39 caracteres la columna.
            const dni = columns[1].trim(); //quita espacios innecesarios.
            const genero = columns[2].trim();  //quita espacios innecesarios.
            const dateString = columns[3].trim() //quita espacios innecesarios.
            const dateComponents = dateString.split('/');//separa la fecha por las '/'.
            
  //Reformatea la fecha a yyyymmdd
  const day = parseInt(dateComponents[0]);
            const month = parseInt(dateComponents[1]);
            const year = parseInt(dateComponents[2]);
            const dateFormat = year + ('0' + month).slice(-2) + ('0' + day).slice(-2);
  
  //le da el formato al archivo txt , dni empieza con 29 siempre. 
  //si dni menor a 8 rellena espacios adelante del dni con 0 , rellena el string de nombre y apellido con espacios para tener  40 characteres minimo.
            txtText += '29'+ dni.padStart(8,'0') + lastnameAndName.padEnd(40,' ') + genero + dateFormat + '\n';
        }
}


//para que se descargue una vez convertido el archivo csv , con el mismo nombre con el que fue cargado .txt.
        const outputFileName = file.name.split('.')[0] + '.txt';
        const txtBlob = new Blob([txtText], {type: 'text/plain'});
        const txtUrl = URL.createObjectURL(txtBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = txtUrl;
        downloadLink.download = outputFileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(txtUrl);
    };

    reader.readAsText(file);
}