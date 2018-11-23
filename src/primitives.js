import factory from './utils/factory';

export const Box = factory('Box', null);
export const Block = factory('Block', { display: 'block' });
export const Flex = factory('Flex', { display: 'flex' });
export const Grid = factory('Grid', { display: 'grid' });
export const Inline = factory('Inline', { display: 'inline' });
export const InlineBlock = factory('InlineBlock', { display: 'inline-block' });
export const InlineFlex = factory('InlineFlex', { display: 'inline-flex' });
