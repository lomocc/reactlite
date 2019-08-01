# reactlite

>

[![NPM](https://img.shields.io/npm/v/reactlite.svg)](https://www.npmjs.com/package/reactlite) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save reactlite
```

## Usage

### DEMO

https://codesandbox.io/s/7yqyq2q8x

### Box

```jsx
<Box color="red" fontSize="24px">
  24px Red Div
</Box>
```

### Container

```jsx
<Container
  smBackgroundColor="red"
  mdBackgroundColor="green"
  lgBackgroundColor="blue"
>
  media query auto change backgroundColor: Red/Green/Blue
</Container>
```

### Modal

https://codesandbox.io/s/reactlite-example-3j5hw

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'reactlite';

class ModalComponent extends React.Component {
  onOk = () => {
    this.props.resolve('ok');
  };
  onCancel = () => {
    this.props.resolve('cancel');
  };
  render() {
    return (
      <div className="ModalComponent">
        <button onClick={this.onOk}>OK</button>
        <button onClick={this.onCancel}>CANCEL</button>
      </div>
    );
  }
}
class Example extends React.Component {
  show = async () => {
    let result = await Modal.show(<ModalComponent />);
    alert(result);
  };

  render() {
    return <button onClick={this.show}>SHOW</button>;
  }
}

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Example />
      <Modal.Provider />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

### Layer

```jsx
import React, { Component } from 'react';

import { Layer, Text } from 'reactlite';

class Example extends Component {
  render() {
    let { showLayer } = this.props;
    return (
      showLayer && (
        <Layer>
          <Text>Layer Content</Text>
        </Layer>
      )
    );
  }
}
```

### 全局 Layer

```jsx
import React, { Component } from 'react';

import { Box, Button, Text, Layer } from 'reactlite';

class App extends Component {
  render() {
    return <Layer.Placeholder />;
  }
}
class Example extends Component {
  add = () => {
    this.element = <Text>Layer Content</Text>;
    Layer.mount(this.element);
  };
  remove = () => {
    Layer.unmount(this.element);
  };
  render() {
    return (
      <Box>
        <Button onClick={this.add}>add</Button>
        <Button onClick={this.remove}>remove</Button>
      </Box>
    );
  }
}
```

unmount self

```jsx
import React, { Component, Fragment } from 'react';

import { Layer } from 'reactlite';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Example />
        <Modal.Provider />
      </Fragment>
    );
  }
}
class ModalComponent extends Component {
  onOk = () => {
    this.props.resolve('ok');
  };
  onCancel = () => {
    this.props.resolve('cancel');
  };
  render() {
    return (
      <div>
        <button onClick={this.onOk}>OK</button>
        <button onClick={this.onCancel}>CANCEL</button>
      </div>
    );
  }
}
class Example extends Component {
  show = async () => {
    let result = await Modal.show(<ModalComponent />);
    console.log(result);
  };

  render() {
    return <button onClick={this.show}>SHOW</button>;
  }
}
```

## License

MIT © [lomocc](https://github.com/lomocc)
