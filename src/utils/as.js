/* eslint-disable no-param-reassign */
import hoistNonReactStatics from 'hoist-non-react-statics';
import React from 'react';
import dedupeClassName from './dedupeClassName';
import getComponentName from './getComponentName';
import pickCSSProps from './pickCSSProps';
import pickHTMLProps from './pickHTMLProps';

function parseTag(tag) {
  if (Array.isArray(tag)) {
    const tags = tag.filter(
      (currentTag, i) => typeof currentTag !== 'string' || i === tag.length - 1
    );
    return tags.length <= 1 ? tags[0] || 'div' : tags;
  }
  return tag || 'div';
}
function toArray(arg) {
  return Array.isArray(arg) ? arg : [arg];
}

function As({ as, nextAs, ...props }) {
  return render(nextAs, props);
}

function render(as, props) {
  const T = parseTag(as);

  if (Array.isArray(T)) {
    const [First, ...others] = T.filter(x => x !== As);
    const other = others.length === 1 ? others[0] : others;
    // @ts-ignore: We can't be sure if First accepts `as` or `nextAs`
    return <First {...props} as={As} nextAs={other} />;
  }

  const style = pickCSSProps(props);

  if (typeof T === 'string') {
    const className = dedupeClassName(props.className);
    const HTMLProps = pickHTMLProps(props);
    return (
      <T
        {...HTMLProps}
        ref={props.elementRef}
        className={className}
        style={style}
      />
    );
  }
  return <T {...props} style={style} />;
}

function isAsComponent(target) {
  return typeof target.asComponents !== 'undefined';
}

function as(asComponents) {
  return WrappedComponent => {
    // Transform WrappedComponent into ReakitComponent
    const defineProperties = scope => {
      scope.asComponents = asComponents;
      // @ts-ignore
      scope.as = otherComponents => as(otherComponents)(scope);
      return scope;
    };

    // WrappedComponent was already enhanced with the same arguments
    if (
      isAsComponent(WrappedComponent) &&
      asComponents === WrappedComponent.asComponents
    ) {
      return defineProperties(WrappedComponent);
    }

    const componentName = getComponentName(WrappedComponent);
    const commaSeparatedAs = [].concat(asComponents).map(getComponentName);
    const displayName = `${componentName}.as(${commaSeparatedAs})`;

    const EnhancedComponent = props =>
      render(
        [
          WrappedComponent,
          ...toArray(asComponents),
          ...toArray(props.as || []),
          ...toArray(props.nextAs || [])
        ],
        props
      );

    EnhancedComponent.displayName = displayName;
    // @ts-ignore: Only docs
    EnhancedComponent.propTypes = WrappedComponent.propTypes;
    // @ts-ignore: Only docs
    EnhancedComponent.defaultProps = WrappedComponent.defaultProps;
    // @ts-ignore
    hoistNonReactStatics(EnhancedComponent, WrappedComponent);

    return defineProperties(EnhancedComponent);
  };
}

export default as;
