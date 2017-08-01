import { UnitTestDemoPage } from './app.po';

describe('unit-test-demo App', () => {
  let page: UnitTestDemoPage;

  beforeEach(() => {
    page = new UnitTestDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
