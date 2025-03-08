import React, { useContext } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const ExploreMenu = ({ category, setCategory }) => {
  const { handleCategoryChange } = useContext(StoreContext); // Fix typo here

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Explore our menu and discover a world of culinary delights, crafted to
        satisfy every craving.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className="explore-menu-list-item"
            onClick={() => {
              const newCategory =
                category === item.menu_name ? "All" : item.menu_name;
              setCategory(newCategory);
              handleCategoryChange(newCategory); // Ensure this is called after setting the category
            }}
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
