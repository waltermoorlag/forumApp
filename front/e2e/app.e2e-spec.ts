import { ForumAppPage } from './app.po';

describe('forum-app App', function() {
  let page: ForumAppPage;

  beforeEach(() => {
    page = new ForumAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
