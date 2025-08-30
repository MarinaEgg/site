// src/components/navigation/BreadcrumbsOptimized.js
import { Breadcrumbs, Typography } from '@material-ui/core';
import { NavigateNext } from '@material-ui/icons';

export const BreadcrumbsOptimized = ({ currentPage, items = [] }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
      style={{ margin: '20px 0', color: 'white' }}
    >
      <Link
        to="/"
        itemProp="itemListElement"
        itemScope
        itemType="https://schema.org/ListItem"
        style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}
      >
        <span itemProp="name">Home</span>
        <meta itemProp="position" content="1" />
      </Link>
      
      {items.map((item, index) => (
        <Link
          key={item.path}
          to={item.path}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}
        >
          <span itemProp="name">{item.name}</span>
          <meta itemProp="position" content={index + 2} />
        </Link>
      ))}
      
      <Typography 
        color="inherit"
        itemProp="itemListElement"
        itemScope
        itemType="https://schema.org/ListItem"
      >
        <span itemProp="name">{currentPage}</span>
        <meta itemProp="position" content={items.length + 2} />
      </Typography>
    </Breadcrumbs>
  );
};
