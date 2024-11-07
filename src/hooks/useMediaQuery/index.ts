import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

/**
 * Use Media Query Hook to determine and watch for changes in screen width
 *
 * @param    {boolean} min
 *           whether query is min-width or not
 * 
 * @param    {number} pixels
 *           number of pixels for query
 *
 * @return   {boolean}
 *           returns boolean whether the inputs matches the screen width
 *
 * @example
 *   const ExampleComponent = () => {
 *     const isMobile = useMediaQuery(true, 768); // Equivalent to "min-width: 768px)"
 *
 *     return (
 *       <h1>
 *         Browsing with {isMobile ? "phone" : "desktop"}
 *       </h1>
 *      )
 *    }
 */

export const useMediaQuery = ( min: boolean = true, pixels: number = 768 ) => {
  const mediaQuery = `(${min ? 'min' : 'max'}-width:${pixels}px)`
  const [isMediaMatch, setIsMediaMatch] = useState(window.matchMedia(mediaQuery).matches);

  useEffect(() => {
      const mediaQueryList = window.matchMedia(mediaQuery);
      const mqlHandler = () => setIsMediaMatch(mediaQueryList.matches);

      mediaQueryList.addEventListener("change", mqlHandler);
      return () => {
          mediaQueryList.removeEventListener("change", mqlHandler);
      };
  }, [mediaQuery]);

  return isMediaMatch;
};

useMediaQuery.PropTypes = {
  min: PropTypes.bool.isRequired,
  pixels: PropTypes.number.isRequired
}

useMediaQuery.defaultProps = {
  min: true,
  pixels: 768
}