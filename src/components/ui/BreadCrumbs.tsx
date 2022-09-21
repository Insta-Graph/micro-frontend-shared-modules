import { useEffect, useState } from 'react';

import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import { Box, Card, Divider, Grid, Typography, Link } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { useTheme } from '@mui/material/styles';

import { config } from '../../constants/config';
import type {
  NavigationItem,
  NavigationItemChildren,
  NavigationItems,
} from '../../constants/routes';

export const gridSpacing = 3;

const linkSX = {
  display: 'flex',
  color: 'grey.900',
  textDecoration: 'none',
  alignContent: 'center',
  alignItems: 'center',
};

interface Props {
  card?: boolean;
  divider?: boolean;
  icon: boolean;
  icons?: boolean;
  maxItems?: number;
  navigation: NavigationItems;
  rightAlign?: boolean;
  separator?: typeof AccountTreeTwoToneIcon;
  title?: boolean;
  titleBottom?: boolean;
}

const Breadcrumbs: React.VFC<Props> = ({
  card,
  divider,
  icon,
  icons,
  maxItems,
  navigation,
  rightAlign,
  separator,
  title,
  titleBottom,
  ...others
}) => {
  const theme = useTheme();

  const iconStyle = {
    marginRight: theme.spacing(0.75),
    marginTop: `-${theme.spacing(0.25)}`,
    width: '1rem',
    height: '1rem',
    color: theme.palette.secondary.main,
  };

  const [main, setMain] = useState<NavigationItem>();
  const [item, setItem] = useState<NavigationItemChildren>();

  // set active item state
  const getCollapse = (menu: NavigationItem): void => {
    if (menu.children) {
      menu.children.filter((collapse) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse);
        } else if (collapse.type && collapse.type === 'item') {
          if (document.location.pathname === config.basename + collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    navigation?.items?.map((menu) => {
      if (menu.type && menu.type === 'group') {
        getCollapse(menu);
      }
      return false;
    });
  });

  // item separator
  const separatorIcon = separator ?? <ChevronRightIcon />;

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = '';
  let CollapseIcon;
  let ItemIcon;

  // collapse item
  if (main && main.type === 'collapse') {
    CollapseIcon = main.icon ? main.icon : ChevronRightIcon;
    mainContent = (
      <Link href="/#" component="div">
        <Typography variant="subtitle1" sx={linkSX}>
          {icons && <CollapseIcon style={iconStyle} />}
          {main.title}
        </Typography>
      </Link>
    );
  }

  // items
  if (item && item.type === 'item') {
    itemTitle = item.title;

    ItemIcon = item.icon ? item.icon : AccountTreeTwoToneIcon;
    itemContent = (
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          textDecoration: 'none',
          alignContent: 'center',
          alignItems: 'center',
          color: 'grey.500',
        }}
      >
        {icons && <ItemIcon style={iconStyle} />}
        {itemTitle}
      </Typography>
    );

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <Card
          sx={{
            marginBottom: card === false ? 0 : theme.spacing(gridSpacing),
            border: card === false ? 'none' : '1px solid',
            borderColor: theme.palette.primary[200] + 75,
            background: card === false ? 'transparent' : theme.palette.background.default,
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...others}
        >
          <Box sx={{ p: 2, pl: card === false ? 0 : 2 }}>
            <Grid
              container
              direction={rightAlign ? 'row' : 'column'}
              justifyContent={rightAlign ? 'space-between' : 'flex-start'}
              alignItems={rightAlign ? 'center' : 'flex-start'}
              spacing={1}
            >
              {title && !titleBottom && (
                <Grid item>
                  <Typography variant="h3" sx={{ fontWeight: 500 }}>
                    {item.title}
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <MuiBreadcrumbs
                  sx={{ '& .MuiBreadcrumbs-separator': { width: 16, ml: 1.25, mr: 1.25 } }}
                  aria-label="breadcrumb"
                  maxItems={maxItems || 8}
                  separator={separatorIcon}
                >
                  <Link href="/" component="div">
                    <Typography color="inherit" variant="subtitle1" sx={linkSX}>
                      {icons && <HomeTwoToneIcon sx={iconStyle} />}
                      {icon && <HomeIcon sx={{ ...iconStyle, mr: 0 }} />}
                      {!icon && 'Dashboard'}
                    </Typography>
                  </Link>
                  {mainContent}
                  {itemContent}
                </MuiBreadcrumbs>
              </Grid>
              {title && titleBottom && (
                <Grid item>
                  <Typography variant="h3" sx={{ fontWeight: 500 }}>
                    {item.title}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
          {card === false && divider !== false && (
            <Divider sx={{ borderColor: theme.palette.primary.main, mb: gridSpacing }} />
          )}
        </Card>
      );
    }
  }

  return breadcrumbContent;
};

export default Breadcrumbs;
