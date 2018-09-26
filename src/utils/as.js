import React from 'react';
import { pickHTMLProps, parseClassName, getComponentName } from './tools';
import { isStyledComponent } from 'styled-components';

function As({ nextAs, ...props }) {
  return render({ ...props, as: nextAs });
}

const parseTag = tag => {
  if (Array.isArray(tag)) {
    const tags = tag.filter(
      (currentTag, i) => typeof currentTag !== 'string' || i === tag.length - 1
    );
    return tags.length <= 1 ? tags[0] || 'div' : tags;
  }
  return tag || 'div';
};

function render({ as, ...props }) {
  let Element = parseTag(as);

  if (Array.isArray(Element)) {
    const [First, ...others] = Element.filter(x => x !== As);
    return <First {...props} as={As} nextAs={others} />;
  }

  // const style = pickCSSProps(props);
  // console.log('style', style);
  const className = parseClassName(props.className);

  // if (style) {
  //   props.style = style;
  // }

  if (typeof Element === 'string') {
    const { children } = props;
    const HTMLProps = pickHTMLProps(props);
    return (
      <Element {...HTMLProps} className={className} ref={props.elementRef}>
        {children}
      </Element>
    );
  }
  return <Element {...props} className={className} />;
}

function as(asComponents) {
  return WrappedComponent => {
    const target = isStyledComponent(WrappedComponent)
      ? WrappedComponent.target
      : WrappedComponent;

    const defineProperties = scope => {
      const xscope = scope;
      xscope.asComponents = asComponents;
      xscope.as = otherComponents => as(otherComponents)(scope);
      return xscope;
    };

    if (
      target.asComponents !== undefined &&
      asComponents === target.asComponents
    ) {
      return defineProperties(WrappedComponent);
    }

    const getAs = props =>
      [].concat(
        WrappedComponent,
        asComponents,
        props.as || [],
        props.nextAs || []
      );

    const componentName = getComponentName(WrappedComponent);
    const commaSeparatedAs = [].concat(asComponents).map(getComponentName);
    const displayName = `${componentName}.as(${commaSeparatedAs})`;

    const EnhancedComponent = props => {
      return render({ ...props, as: getAs(props) });
    };

    EnhancedComponent.displayName = displayName;

    if (isStyledComponent(WrappedComponent)) {
      const StyledComponent = EnhancedComponent;
      StyledComponent.styledComponentId = WrappedComponent.styledComponentId;
      StyledComponent.target = EnhancedComponent;
      return defineProperties(StyledComponent);
    }

    return defineProperties(EnhancedComponent);
  };
}

export default as;
