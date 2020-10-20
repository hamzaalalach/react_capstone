# Full Stack CAPSTONE PROJECT Frontend

Note: The following setup is for local use, otherwise the frontend is hosted at: [https://casting-cap.herokuapp.com](https://casting-cap.herokuapp.com/)

## Getting Setup

> _tip_: this frontend is designed to work with [Flask-based Backend](../backend). It is recommended you stand up the backend first.

### Installing Dependencies

#### Installing Node and NPM

This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (the download includes NPM) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

#### Installing project dependencies

This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the root directory of this repository. After cloning, open your terminal and run:

```bash
npm install
```

#### Running the project

```bash
npm start
```

## Frameworks and tools

The frontend was built using [React](https://reactjs.org/) and [Redux](https://redux.js.org).

## RBAC on the frontend

RBAC is ensured and forced on the frontend using the following components:

#### Can
```javascript
  <Can
    user={user}
    perform="get:actors, get:movies"
    yes={() => (
        <Fragment>
            <img src={user.picture} alt="Profile" />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <code>{JSON.stringify(user, null, 2)}</code>
        </Fragment>
    )}
    no={() => <Redirect to="/" />}
    />
```
Can enables rbac on the frontend, with perfom the required permissions and user the user perfoming the action.

#### PrivateRoute
```javascript
<PrivateRoute path="/profile" component={Profile} />
```

This component forces the user to be authenticated to access the specified component.