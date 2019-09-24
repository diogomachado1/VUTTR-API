import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Tool from '../src/app/models/Tool';

function generateTag() {
  return [...Array(faker.random.number({ min: 1, max: 10 })).keys()].map(() =>
    faker.lorem.word()
  );
}

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Tool', Tool, {
  title: faker.name.findName(),
  description: faker.lorem.sentence(),
  link: faker.internet.url(),
  tags: generateTag(),
});

export default factory;
