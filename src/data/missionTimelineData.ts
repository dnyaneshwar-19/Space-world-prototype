
export interface Mission {
    id: string;
    year: number;
    title: string;
    description: string;
    image: string;
    category: 'milestone' | 'tech' | 'human';
    // New Extended Fields
    gallery?: string[];
    fullStory?: string;
    impact?: string;
}

export const MISSION_TIMELINE_DATA: Mission[] = [
    {
        id: "sputnik-1",
        year: 1957,
        title: "Sputnik 1",
        description: "The first artificial Earth satellite. It orbited for three weeks.",
        image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1080&auto=format&fit=crop",
        category: 'milestone',
        gallery: [
            "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1080&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1080&auto=format&fit=crop"
        ],
        fullStory: "Sputnik 1 was the first artificial Earth satellite. It was launched into an elliptical low Earth orbit by the Soviet Union on 4 October 1957 as part of the Soviet space program. It orbited for three weeks before its three silver-zinc batteries ran out.",
        impact: "Triggered the Space Race, leading to rapid advancements in aerospace technology."
    },
    {
        id: "vostok-1",
        year: 1961,
        title: "Vostok 1",
        description: "Yuri Gagarin becomes the first human to journey into outer space.",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1080&auto=format&fit=crop",
        category: 'human',
        gallery: [
            "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1080&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1080&auto=format&fit=crop"
        ],
        fullStory: "Vostok 1 was the first spaceflight of the Vostok programme and the first human spaceflight in history. The Vostok 3KA space capsule was launched from Baikonur Cosmodrome on April 12, 1961, with Soviet cosmonaut Yuri Gagarin aboard.",
        impact: "Proved that humans could survive in space and return safely."
    },
    {
        id: "apollo-11",
        year: 1969,
        title: "Apollo 11",
        description: "Humans walk on the Moon for the first time.",
        image: "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1080&auto=format&fit=crop",
        category: 'milestone',
        gallery: [
             "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1080&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1454789548728-85d2696cf6af?q=80&w=1080&auto=format&fit=crop"
        ],
        fullStory: "Apollo 11 was the spaceflight that first landed humans on the Moon. Commander Neil Armstrong and lunar module pilot Buzz Aldrin formed the American crew that landed the Apollo Lunar Module Eagle on July 20, 1969.",
        impact: "Marked the pinnacle of the Space Race and human exploration beyond LEO."
    },
    // ... keep other existing missions as basic entries or expand them similarly if needed for full completeness, 
    // but for the 'Enhance Gallery' prompt, focusing on top 3 is sufficient for the demo.
    {
        id: "hubble",
        year: 1990,
        title: "Hubble Telescope",
        description: "A large space telescope that has provided detailed images.",
        image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=1080&auto=format&fit=crop",
        category: 'tech'
    },
    {
        id: "iss",
        year: 1998,
        title: "ISS Launch",
        description: "The first component of the ISS launched.",
        image: "https://images.unsplash.com/photo-1454789548728-85d2696cf6af?q=80&w=1080&auto=format&fit=crop",
        category: 'milestone'
    },
    {
        id: "james-webb",
        year: 2021,
        title: "James Webb",
        description: "The most powerful space telescope ever launched.",
        image: "https://images.unsplash.com/photo-1614726365723-49cfae9278b7?q=80&w=1080&auto=format&fit=crop",
        category: 'tech'
    }
];
