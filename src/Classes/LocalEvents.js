import app from "./App";
class LocalEvents {
  app;

  formConstruct() {
    const form = document.createElement("form");
    form.setAttribute("id", "form");

    const inputTitle = document.createElement("input");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("placeholder", "titre");
    inputTitle.setAttribute("id", "title");
    inputTitle.setAttribute("class", "form-control");
    inputTitle.innerHTML = "title";

    const inputDescription = document.createElement("input");
    inputDescription.setAttribute("type", "text");
    inputDescription.setAttribute("id", "description");
    inputDescription.setAttribute("placeholder", "description");
    inputDescription.setAttribute("class", "form-control");

    const inputDateDebut = document.createElement("input");
    inputDateDebut.setAttribute("id", "dateDebut");
    inputDateDebut.setAttribute("class", "form-control");
    inputDateDebut.setAttribute("type", "datetime-local");

    const inputDateFin = document.createElement("input");
    inputDateFin.setAttribute("id", "dateFin");
    inputDateFin.setAttribute("class", "form-control");
    inputDateFin.setAttribute("type", "datetime-local");

    const inputLong = document.createElement("input");
    inputLong.setAttribute("type", "number");
    inputLong.setAttribute("step","any");
    inputLong.setAttribute("class", "form-control");
    inputLong.setAttribute("id", "long");


    const inputLat = document.createElement("input");
    inputLat.setAttribute("type", "number");
    inputLat.setAttribute("step","any");
    inputLat.setAttribute("class", "form-control");
    inputLat.setAttribute("id", "lat");
  

    const inputSend = document.createElement("input");
    inputSend.setAttribute("class", "form-control");
    inputSend.setAttribute("type", "button");
    inputSend.setAttribute("value", "Valider");
    inputSend.setAttribute("id", "send");


    formEvent.appendChild(form);

    form.appendChild(inputTitle);
    form.appendChild(inputDescription);
    form.appendChild(inputDateDebut);
    form.appendChild(inputDateFin);
    form.appendChild(inputLong);
    form.appendChild(inputLat);
    form.appendChild(inputSend);

  }



}

export default LocalEvents;
