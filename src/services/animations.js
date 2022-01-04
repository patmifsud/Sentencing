const animations = {
  phaseContainer: {
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 1.25,
      },
    },
    hide: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.5,
        ease: "easeIn",
        when: "afterChildren",
      },
    },
  },
  springTransition: {
    type: "spring",
    dampening: 30,
    mass: 0.3,
    stiffness: 150,
  },
  loading: {
    show: {
      opacity: 0.5,
      transition: {
        duration: 0.2,
      },
    },
    hide: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  },
  phaseTitle: {
    show: {
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        type: "spring",
        // dampening: 30,
        // mass: 0.5,
        // stiffness: 100,
      },
    },
    hide: {
      y: -1000,
      scale: 1.4,
      transition: {
        duration: 2,
        type: "spring",
        dampening: 30,
        // mass: 0.5,
        // stiffness: 100,
      },
    },
  },
  childAnimations: {
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        when: "beforeChildren",
        staggerChildren: 1.25,
        delayChildren: 2,
        duration: 0.25, 
        ease: "easeOut" 
      } 
    },
    hide: { opacity: 0, y: -2, transition: { duration: 0.25, ease: "easeIn" } },
  },
};

export default animations;
