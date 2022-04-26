import { Fragment } from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import SearchBar from "../../components/SearchBar";
import FactCheckIcon from "@mui/icons-material/FactCheck";

function Header(props) {
  const { sections, title } = props;

  return (
    <Fragment>
      <Toolbar sx={{ borderBottom: 3, borderColor: "divider" }}>
        <FactCheckIcon></FactCheckIcon>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          sx={{ m: 1, flex: 1 }}
        >
          {title}
        </Typography>

        <SearchBar
          setSearch={props.setSearch}
          setCategoryName={props.setCategoryName}
        ></SearchBar>
      </Toolbar>

      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            underline="hover"
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
