import React, { useEffect, useState } from "react";

import TutorialDataService from "../services/TutorialService";

const Tutorial = props => {
  const initialTutorialState = {
    id: null,
    name: "",
    postalAddress: {},
    phoneNumber: "",
    email: ""
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const getTutorial = id => {
    TutorialDataService.get(id)
      .then(response => {
        console.log(response);
        setCurrentTutorial(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentTutorial.id,
      name: currentTutorial.name,
      postalAddress: currentTutorial.postalAddress,
      phoneNumber: currentTutorial.phoneNumber,
      email: currentTutorial.email
    };

    TutorialDataService.update(currentTutorial.id, data)
      .then(response => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        console.log(response.data);
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialDataService.update(currentTutorial.id, currentTutorial)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialDataService.remove(currentTutorial.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Dobavljač</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Naziv</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentTutorial.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Broj Telefona</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={currentTutorial.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">Grad</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={currentTutorial.postalAddress.city}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Poštanski kod</label>
              <input
                type="text"
                className="form-control"
                id="postalCode"
                name="postalCode"
                value={currentTutorial.postalAddress.postalCode}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="streetName">Ulica</label>
              <input
                type="text"
                className="form-control"
                id="streetName"
                name="streetName"
                value={currentTutorial.postalAddress.streetName}
                onChange={handleInputChange}
              />
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
