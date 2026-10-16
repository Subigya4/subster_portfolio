import type { MDXComponents } from 'mdx/types';

// Customise how MDX elements render (used by @next/mdx in the App Router).
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = '', children, ...rest }) => {
      const external = /^https?:\/\//.test(href);
      return (
        <a href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})} {...rest}>
          {children}
        </a>
      );
    },
    ...components,
  };
}
