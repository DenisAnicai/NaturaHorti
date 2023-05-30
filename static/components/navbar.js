"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true, get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
  Object.defineProperty(o, "default", {enumerable: true, value: v});
}) : function (o, v) {
  o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const React = __importStar(require("react"));
const styles_1 = require("@mui/material/styles");
const AppBar_1 = __importDefault(require("@mui/material/AppBar"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const InputBase_1 = __importDefault(require("@mui/material/InputBase"));
const Badge_1 = __importDefault(require("@mui/material/Badge"));
const MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
const Menu_1 = __importDefault(require("@mui/material/Menu"));
const Menu_2 = __importDefault(require("@mui/icons-material/Menu"));
const Search_1 = __importDefault(require("@mui/icons-material/Search"));
const AccountCircle_1 = __importDefault(require("@mui/icons-material/AccountCircle"));
const Mail_1 = __importDefault(require("@mui/icons-material/Mail"));
const Notifications_1 = __importDefault(require("@mui/icons-material/Notifications"));
const MoreVert_1 = __importDefault(require("@mui/icons-material/MoreVert"));
const Search = (0, styles_1.styled)('div')(({theme}) => ({
  position: 'sticky',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: (0, styles_1.alpha)(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: (0, styles_1.alpha)(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));
const SearchIconWrapper = (0, styles_1.styled)('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = (0, styles_1.styled)(InputBase_1.default)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (React.createElement(Menu_1.default, {
      anchorEl: anchorEl, anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      }, id: menuId, keepMounted: true, transformOrigin: {
        vertical: 'top',
        horizontal: 'right',
      }, open: isMenuOpen, onClose: handleMenuClose
    },
    React.createElement(MenuItem_1.default, {onClick: handleMenuClose}, "Profile"),
    React.createElement(MenuItem_1.default, {onClick: handleMenuClose}, "My account")));
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (React.createElement(Menu_1.default, {
      anchorEl: mobileMoreAnchorEl, anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      }, id: mobileMenuId, keepMounted: true, transformOrigin: {
        vertical: 'top',
        horizontal: 'right',
      }, open: isMobileMenuOpen, onClose: handleMobileMenuClose
    },
    React.createElement(MenuItem_1.default, null,
      React.createElement(IconButton_1.default, {size: "large", "aria-label": "show 4 new mails", color: "inherit"},
        React.createElement(Badge_1.default, {badgeContent: 4, color: "error"},
          React.createElement(Mail_1.default, null))),
      React.createElement("p", null, "Messages")),
    React.createElement(MenuItem_1.default, null,
      React.createElement(IconButton_1.default, {
          size: "large",
          "aria-label": "show 17 new notifications",
          color: "inherit"
        },
        React.createElement(Badge_1.default, {badgeContent: 17, color: "error"},
          React.createElement(Notifications_1.default, null))),
      React.createElement("p", null, "Notifications")),
    React.createElement(MenuItem_1.default, {onClick: handleProfileMenuOpen},
      React.createElement(IconButton_1.default, {
          size: "large",
          "aria-label": "account of current user",
          "aria-controls": "primary-search-account-menu",
          "aria-haspopup": "true",
          color: "inherit"
        },
        React.createElement(AccountCircle_1.default, null)),
      React.createElement("p", null, "Profile"))));
  return (React.createElement(Box_1.default, {sx: {flexGrow: 1}},
    React.createElement(AppBar_1.default, {position: "static"},
      React.createElement(Toolbar_1.default, null,
        React.createElement(IconButton_1.default, {
            size: "large",
            edge: "start",
            color: "inherit",
            "aria-label": "open drawer",
            sx: {mr: 2}
          },
          React.createElement(Menu_2.default, null)),
        React.createElement(Typography_1.default, {
          variant: "h6",
          noWrap: true,
          component: "div",
          sx: {display: {xs: 'none', sm: 'block'}}
        }, "MUI"),
        React.createElement(Search, null,
          React.createElement(SearchIconWrapper, null,
            React.createElement(Search_1.default, {sx: {color: 'secondary.main'}})),
          React.createElement(StyledInputBase, {placeholder: "Search\u2026", inputProps: {'aria-label': 'search'}})),
        React.createElement(Box_1.default, {sx: {flexGrow: 1}}),
        React.createElement(Box_1.default, {sx: {display: {xs: 'none', md: 'flex'}}},
          React.createElement(IconButton_1.default, {size: "large", "aria-label": "show 4 new mails", color: "inherit"},
            React.createElement(Badge_1.default, {badgeContent: 4, color: "error"},
              React.createElement(Mail_1.default, null))),
          React.createElement(IconButton_1.default, {
              size: "large",
              "aria-label": "show 17 new notifications",
              color: "inherit"
            },
            React.createElement(Badge_1.default, {badgeContent: 17, color: "error"},
              React.createElement(Notifications_1.default, null))),
          React.createElement(IconButton_1.default, {
              size: "large",
              edge: "end",
              "aria-label": "account of current user",
              "aria-controls": menuId,
              "aria-haspopup": "true",
              onClick: handleProfileMenuOpen,
              color: "inherit"
            },
            React.createElement(AccountCircle_1.default, null))),
        React.createElement(Box_1.default, {sx: {display: {xs: 'flex', md: 'none'}}},
          React.createElement(IconButton_1.default, {
              size: "large",
              "aria-label": "show more",
              "aria-controls": mobileMenuId,
              "aria-haspopup": "true",
              onClick: handleMobileMenuOpen,
              color: "inherit"
            },
            React.createElement(MoreVert_1.default, null))))),
    renderMobileMenu,
    renderMenu));
}

exports.default = NavBar;
