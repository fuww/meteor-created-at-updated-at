# Meteor SimpleSchema automatic createdAt and updatedAt fields

Add easily createAt and updatedAt fields to your schema.

## Install

```sh
meteor add fuww:created-at-updated-at
```

## Usage

### createdAt and updatedAt

```js
import {createdAtUpdatedAtSchema} from 'meteor/fuww:created-at-updated-at';

const citySchema = new SimpleSchema([{
  name: {
    type: String
  },
  state: {
    type: String,
    optional: true
  },
  country: {
    type: String
  }
}, createdAtUpdatedAtSchema]);

City.attachSchema(citySchema);
```

### createdAt only

```js
import {createdAtSchema} from 'meteor/fuww:created-at-updated-at';

const citySchema = new SimpleSchema([{
  name: {
    type: String
  },
  state: {
    type: String,
    optional: true
  },
  country: {
    type: String
  }
}, createdAtSchema]);

City.attachSchema(citySchema);
```

### updatedAt only

```js
import {updatedAtSchema} from 'meteor/fuww:created-at-updated-at';

const citySchema = new SimpleSchema([{
  name: {
    type: String
  },
  state: {
    type: String,
    optional: true
  },
  country: {
    type: String
  }
}, updatedAtSchema]);

City.attachSchema(citySchema);
```

## Running tests

In your meteor project run:

```sh
meteor test-packages --driver-package=practicalmeteor:mocha fuww:created-at-updated-at
```
