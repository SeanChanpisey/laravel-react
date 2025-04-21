import React from 'react';
import { 
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Toolbar,
  CssBaseline
} from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import ProductList from '../ProductList';

const drawerWidth = 240;

const styles = {
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: 1300,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: '24px',
    marginLeft: drawerWidth,
  },
  productCard: {
    padding: '16px',
    marginBottom: '16px',
    height: '200px',
    position: 'relative',
  },
  statusSection: {
    padding: '16px',
    marginBottom: '24px',
    backgroundColor: '#f5f5f5',
  },
};

export default function AdminDashboard() {
  return (
    <div style={styles.root}>
      <CssBaseline />
      <AppBar position="fixed" style={styles.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        style={styles.drawer}
        variant="permanent"
        classes={{ paper: styles.drawerPaper }}
      >
        <Toolbar />
        <List>
          {['Products', 'Orders', 'Statistics', 'Sellers'].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main style={styles.content}>
        <Toolbar />
        
        {/* Search Bar */}
        <div style={{ marginBottom: '24px' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products..."
            InputProps={{
              startAdornment: <SearchIcon style={{ marginRight: '8px' }} />,
            }}
          />
        </div>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {[1].map((item) => (
            <ProductList/>
          ))}
        </Grid>

        {/* Status Section */}
        <Paper style={styles.statusSection}>
          <Typography variant="h6" gutterBottom>
            Status
          </Typography>
          <Typography variant="body1">
            Category: Last added
          </Typography>
        </Paper>
      </main>
    </div>
  );
}
