import { useState, useEffect } from "react";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Header from "./Header";
import Footer from "./Footer";
import Register from "./Register";
import api from "../utils/Api";
import { Authorization, CheckToken, Signup } from "../utils/auth";
import EditProfilePopup from "./EditProfilePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import { ProtectedRoute, PublicRoute } from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistedIn, setIsRegistedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api.setAuthToken(jwt);
      CheckToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            api.getUserInfo().then((result) => {
              setCurrentUser(result);
              setUserEmail(result.email);
            });
            api.getInitialCards().then((result) => {
              setCards(result);
            });
          }
        })
        .catch((err) => {
          setIsLoggedIn(false);
        });
    }
  }, []);

  async function onLogin(email, password) {
    try {
      const res = await Authorization(email, password);
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        api.setAuthToken(res.token);
        const userData = await CheckToken(res.token);
        if (userData) {
          setCurrentUser(userData);
          setUserEmail(userData.email);
          setIsLoggedIn(true);

          api.getInitialCards().then((result) => {
            setCards(result);
          });

          handleInfoTooltipOpen();
          setTimeout(() => {
            closeAllPopups();
            return <Navigate to="/" />;
          }, 1500);
        }
      } else {
        console.log("Error de autenticación: token no recibido");
        handleInfoTooltipOpen();
      }

      // if (res.status === "ok") {
      //   setUserEmail(email);
      //   setIsLoggedIn(true);
      //   console.log(isLoggedIn);
      //   handleInfoTooltipOpen();
      //   setTimeout(() => {
      //     closeAllPopups();
      //     return <Navigate to="/" />;
      //   }, 1500);
      // }
    } catch (error) {
      console.log("Error al intentar iniciar sesión:", error);
      handleInfoTooltipOpen();
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .editUserInfo({ name, about })
      .then((result) => {
        setCurrentUser(result);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }
  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .editUserAvatar({ avatar })
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleDeleteConfirmation(card) {
    setSelectedCard(card);
    setIsDeletePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .removeCard(selectedCard._id)
      .then(() => {
        setCards((state) =>
          state.filter((card) => card._id !== selectedCard._id)
        );
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleAddPlace({ name, link }) {
    setIsLoading(true);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  async function onSignUp(email, password) {
    try {
      const res = await Signup(email, password);

      if (res._id) {
        setIsRegistedIn(true);
        handleInfoTooltipOpen();
        setTimeout(() => {
          closeAllPopups();
          setIsRegistedIn(false);
          return <Navigate to="/signin" />;
        }, 2000);
      }
    } catch (error) {
      console.log("Error al intentar registrarse:", error);
      handleInfoTooltipOpen();
    }
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserEmail("");

    return <Navigate to="/signin" />;
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Routes>
            <Route
              path="*"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  {isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <PublicRoute isLoggedIn={isLoggedIn}>
                  <>
                    <Header isLoggedIn={isLoggedIn} />
                    <Login onLogin={onLogin} />
                    <InfoTooltip
                      isOpen={isInfoTooltipOpen}
                      onClose={closeAllPopups}
                      isLoggedIn={isLoggedIn}
                    />
                  </>
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute isLoggedIn={isLoggedIn}>
                  <>
                    <Header isLoggedIn={isLoggedIn} />
                    <Register register={onSignUp} />
                    <InfoTooltip
                      isOpen={isInfoTooltipOpen}
                      onClose={closeAllPopups}
                      isLoggedIn={isRegistedIn}
                    />
                  </>
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <>
                    <Header
                      isLoggedIn={isLoggedIn}
                      onSignOut={onSignOut}
                      userEmail={userEmail}
                    />
                    <Main
                      onEditProfileClick={handleEditProfileClick}
                      onAddPlaceClick={handleAddPlaceClick}
                      onEditAvatarClick={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      cards={cards}
                      onLikeClick={handleCardLike}
                      onCardDelete={handleDeleteConfirmation}
                    />
                    <EditProfilePopup
                      isOpen={isEditProfilePopupOpen}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                      isLoading={isLoading}
                    />

                    <EditAvatarPopup
                      isOpen={isEditAvatarPopupOpen}
                      onClose={closeAllPopups}
                      isLoading={isLoading}
                      onUpdateAvatar={handleUpdateAvatar}
                    />
                    <AddPlacePopup
                      isOpen={isAddPlacePopupOpen}
                      onClose={closeAllPopups}
                      isLoading={isLoading}
                      onAddPlace={handleAddPlace}
                    />
                    <DeleteConfirmationPopup
                      isOpen={isDeletePopupOpen}
                      onClose={closeAllPopups}
                      isLoading={isLoading}
                      onCardDelete={handleCardDelete}
                    />
                    <ImagePopup
                      isOpen={isImagePopupOpen}
                      onClose={closeAllPopups}
                      link={selectedCard.link}
                      name={selectedCard.name}
                    />
                    <InfoTooltip
                      isOpen={isInfoTooltipOpen}
                      onClose={closeAllPopups}
                      isLoggedIn={isLoggedIn}
                    />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
