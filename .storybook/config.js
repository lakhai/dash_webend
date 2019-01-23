import { configure } from '@storybook/react';
import 'semantic-ui-css/semantic.min.css';

const req = require.context('../stories', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
