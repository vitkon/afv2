import * as React from 'react';
import './layout.module.css';
import HeaderNavigation from '../header-navigation';
import Menu from '../menu';

interface IProps extends React.HTMLProps<HTMLDivElement> {
  location: {
    pathname: string;
  };
  children: any;
}

export default class DefaultLayout extends React.PureComponent<
  IProps,
  { scrolled: boolean }
> {
  state = {
    scrolled: false
  };

  componentDidMount() {
    this.bindScroll();
  }

  componentWillUnmount() {
    this.unbindScroll();
  }

  bindScroll() {
    window.addEventListener('scroll', this.handleScroll);
  }

  unbindScroll() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const body: any = document.body;
    const top =
      document.documentElement.scrollTop ||
      body.parentNode.scrollTop ||
      body.scrollTop;

    if (!this.state.scrolled && top > 300) {
      this.setState({
        scrolled: true
      });
    }

    if (this.state.scrolled && top < 300) {
      this.setState({
        scrolled: false
      });
    }
  };

  render() {
    return (
      <div
        id="outer-container"
        className={this.state.scrolled ? 'scrolled' : ''}
      >
        <Menu />
        <div id="page-wrap" className="container">
          <header>
            <HeaderNavigation />
          </header>
          <main>{this.props.children}</main>
          <footer>
            <p>
              2018 &copy; Appfocused Limited. All rights reserved.<br />
              Appfocused Limited is a company registered in England and Wales
              with company number 10477647
            </p>
          </footer>
        </div>
      </div>
    );
  }
}
