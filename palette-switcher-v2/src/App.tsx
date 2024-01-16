import type { ParentComponent } from 'solid-js';
import Header from './Header';
import 'flowbite';
import Footer from './Footer';

const App: ParentComponent = (props) => <div class='flex flex-col h-screen'>
  <Header />
  <main class='mb-auto'>
    {props.children}
  </main>
  <Footer />
</div>

export default App;

