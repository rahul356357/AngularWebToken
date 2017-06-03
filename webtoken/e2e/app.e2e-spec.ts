import { WebtokenPage } from './app.po';

describe('webtoken App', () => {
  let page: WebtokenPage;

  beforeEach(() => {
    page = new WebtokenPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
