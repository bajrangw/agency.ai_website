import React from 'react'
import assets from '../assets/assets'
import Title from './Title';
import ServiceCard from './ServiceCard';
import { motion } from "motion/react"

const Services = () => {
    const servicesData = [
        {
            title: 'Advertising',
            description: 'Boost your brand visibility and reach with our targeted advertising strategies across multiple platforms.',
            icon: assets.ads_icon
        },
        {
            title: 'Content marketing',
            description: 'Engage your audience with compelling content that drives traffic, builds trust, and converts leads into customers.',
            icon: assets.marketing_icon
        },
        {
            title: 'Content writing',
            description: 'Professional content writing services to create high-quality, SEO-optimized articles, blogs, and web copy that resonates with your audience.',
            icon: assets.content_icon
        },
        {
            title: 'Social media',
            description: 'Enhance your online presence and connect with your audience through effective social media management and campaigns.',
            icon: assets.social_icon
        },
    ]
  return (
    <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ staggerChildren: 0.2 }}
    
    id='services' className='relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white'>

        <img src={assets.bgImage2} alt="" className='absolute -top-110 -left-70 -z-1 dark:hidden'/>

        <Title title='How can we help?' desc='From strategy to execution, we craft digital solutions that move your business forward.'/>

        <div className='flex flex-col md:grid grid-cols-2'>
            {servicesData.map((service, index) => (
                <ServiceCard key={index} service={service} index={index}/>
            ))}
        </div>
      
    </motion.div>
  )
}

export default Services
