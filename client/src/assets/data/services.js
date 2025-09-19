
// IMAGES IMPORT
// => webdev
import webdev1 from '../images/web-dev/webdev1.jpeg';
import webdev2 from '../images/web-dev/webdev2.jpeg';

// => saas
import saas1 from '../images/saas/saas1.gif';


// => social
import social1 from '../images/social/social1.gif';
import social2 from '../images/social/social2.gif';

//=> digital-marketing

// => photography

// => video graphy

const hreftag = '/pages/services'

const services = [
  {
    id: 1,
    name: "Web Development",
    images: [webdev1, webdev2],
    tags: ["web", "dev"],
    href: `${hreftag}/web-development`
  },
  {
    id: 2,
    name: "Social Media Marketing",
    images: [social1 , social2],
    href: `${hreftag}/Social-Media-Marketing`
  },
  {
    id: 3,
    name: "SaaS Solutions",
    images: [saas1],
    href: `${hreftag}/Saas`
  },
  {
    id: 4,
    name: "Digital Marketing",
    images: [],
    href: `${hreftag}/Digital-Marketing`
  },
  {
    id: 5,
    name: "Photography",
    images: [],
    href: `${hreftag}/Photography-VideoGraphy`
  },
  {
    id: 6,
    name: "Videography",
    images: [],
    href: `${hreftag}/Photography-VideoGraphy`
  },
];

export default services;
