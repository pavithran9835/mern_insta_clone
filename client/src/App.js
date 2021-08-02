import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./Component/NotFound";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import { PrivateRoute, RouterLink } from "./PrivateRouter";
import Loading from "./Component/Loading/Loading";
import Header from "./Component/Header/Header";
import { isAuth } from "./helper";
import Search from "./Component/Header/Search";
import Profile from "./Pages/Profile/Profile";
import Editprofile from "./Pages/EditProfile/Editprofile";
import Explore from "./Pages/Explore/Explore";
import SinglePost from "./Component/Home/SinglePost";
import Message from "./Pages/Message/Message";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <RouterLink exact path="/register" component={Register} />
          <RouterLink exact path="/login" component={Login} />
          <Route exact path="/search" component={Search} />
          <PrivateRoute exact path="/profile/:id" component={Profile} />
          <Route exact path="/loading" component={Loading} />
          <PrivateRoute
            exact
            path="/edit-profile/:id"
            component={Editprofile}
          />
          <PrivateRoute exact path="/single-post/:id" component={SinglePost} />
          <PrivateRoute exact path="/explore" component={Explore} />
          <PrivateRoute exact path="/message" component={Message} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
