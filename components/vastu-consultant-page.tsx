'use client'

import React, { useState, useEffect, useRef } from 'react'
import { MapPin, Phone, Search, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

export default function VastuConsultantPageComponent() {
  const [showMap, setShowMap] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleBookAppointment = () => {
    console.log("Booking appointment...")
  }

  const handleWhatsApp = () => {
    window.open("https://wa.me/8368532837", "_blank")
  }

  const handleShowMap = () => {
    setShowMap(true)
  }

  const carouselImages = [
    "/vastu-image-1.jpg",
    "/vastu-image-2.jpg",
    "/vastu-image-3.jpg",
    "/vastu-image-4.jpg",
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  // Scrolling effects
  const fadeInRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    fadeInRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      fadeInRef.current.forEach((el) => {
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-green-100"> {}
      <header className="bg-brown-800 p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <div className="flex items-center space-x-4 text-black">
          <Phone className="text-red-500" />
          <span>+91 123456789</span>
          <Button onClick={handleWhatsApp} variant="outline" className="flex items-center text-black border-white">
            <MessageCircle className="w-5 h-5 mr-2" />
            +91 123456789
          </Button>
        </div>
        <img src="/logo.png" alt="Vastushodhan" className="h-12" />
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="text-black border-white">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Button className="bg-yellow-500 hover:bg-yellow-600">BOOK AN APPOINTMENT</Button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-yellow-500 text-white p-12 text-center">
          <h1 className="text-4xl font-bold mb-6">Vastu Consultant</h1>
          <Button onClick={handleBookAppointment} size="lg" className="bg-orange-600 hover:bg-orange-700">
            CONSULT TODAY 
          </Button>
        </section>

        <section className="p-12" ref={(el) => (fadeInRef.current[0] = el)}>
          <h2 className="text-3xl font-bold mb-6">Services</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <p className="mb-4">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis, dolor aliquid pariatur cupiditate dolore molestiae atque, numquam a optio explicabo error quisquam quasi! Nemo ipsam quae doloribus, dolore minus alias.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae similique sapiente alias est natus repellat eos, voluptatem aliquam dolore rem minima! Qui adipisci enim iure? Doloremque nisi veniam voluptatibus aspernatur?
              </p>
            </div>
            <div className="flex-1">
              <img src="/vastu-image.jpg" alt="Vastu Consultation" className="w-full rounded-lg" />
            </div>
          </div>
        </section>

        <section className="bg-blue-200 p-12 text-center" ref={(el) => (fadeInRef.current[1] = el)}>
          <h2 className="text-3xl font-bold mb-6">Location</h2>
          <Button onClick={handleShowMap} size="lg" className="bg-blue-600 text-white">
            <MapPin className="mr-2" />
            Show My Location
          </Button>
          {showMap && (
            <div className="mt-6 h-64 bg-gray-300 flex items-center justify-center">
              <p>Map showing your location would appear here</p>
            </div>
          )}
        </section>

        <section className="p-12" ref={(el) => (fadeInRef.current[2] = el)}>
          <h2 className="text-3xl font-bold mb-6">Photo Carousel</h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {carouselImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Vastu Consultation ${index + 1}`}
                    className="w-full h-96 object-cover flex-shrink-0"
                  />
                ))}
              </div>
            </div>
            <Button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-brown-800 text-white p-6 text-center">
        <p>&copy;</p>
      </footer>

      <WhatsAppIcon
        onClick={handleWhatsApp}
        className="fixed bottom-4 right-4 w-12 h-12 transition-transform transform hover:scale-110 hover:opacity-80"
      />

    </div>
  )
}

export { VastuConsultantPageComponent }
