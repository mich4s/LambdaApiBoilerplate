import { Container } from 'inversify';

const container: Container = new Container({
  defaultScope: 'Singleton',
  autoBindInjectable: true,
});

export default container;
