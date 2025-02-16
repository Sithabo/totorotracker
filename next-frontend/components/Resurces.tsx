import React from "react";
import Link from "next/link";

const researchLinks = [
  {
    category: "Unbeneficial Time on Social Media",
    links: [
      {
        title: "Increased Loneliness and Depression",
        source: "Hunt, Melissa G., et al. (2018)",
        url: "https://doi.org/10.1521/jscp.2018.37.10.751",
      },
      {
        title: "Mental Health Conditions and Social Media",
        source: "Vannucci, Anna, and Christine McCauley Ohannessian (2020)",
        url: "https://doi.org/10.1016/j.chb.2019.106112",
      },
      {
        title: "Toxic Interactions",
        source: "Hinduja, Sameer, and Justin W. Patchin (2021)",
        url: "https://cyberbullying.org/Cyberbullying-Research-Center-2021-Report.pdf",
      },
    ],
  },
  {
    category: "Beneficial Time on Social Media",
    links: [
      {
        title: "Social Connection and Well-Being",
        source: "Liu, David, et al. (2022)",
        url: "https://doi.org/10.1038/s41467-022-30227-9",
      },
      {
        title: "Professional Development",
        source: "Pew Research Center (2023)",
        url: "https://www.pewresearch.org/",
      },
      {
        title: "Learning Opportunities",
        source: "Al-Rahmi, Waleed M., et al. (2021)",
        url: "https://doi.org/10.1007/s10648-020-09578-3",
      },
    ],
  },
  {
    category: "Mixed/Neutral Time on Social Media",
    links: [
      {
        title: "News Consumption",
        source: "Newman, Nic, et al. (2023)",
        url: "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2023",
      },
      {
        title: "Event Planning",
        source: "Eventbrite (2022)",
        url: "https://www.eventbrite.com/blog/event-marketing-statistics-ds00/",
      },
    ],
  },
  {
    category: "Global Social Media Usage Trends",
    links: [
      {
        title: "Global Average",
        source: "Kemp, Simon (2023)",
        url: "https://datareportal.com/reports/digital-2023-global-overview-report",
      },
      {
        title: "Generational Differences",
        source: "Pew Research Center (2023)",
        url: "https://www.pewresearch.org/",
      },
    ],
  },
  {
    category: "Tips for Balancing Social Media Use",
    links: [
      {
        title: "Set Time Limits",
        source: "Brailovskaia, Julia, et al. (2020)",
        url: "https://doi.org/10.2196/18052",
      },
      {
        title: "Engage Actively",
        source: "Verduyn, Philippe, et al. (2021)",
        url: "https://doi.org/10.1016/j.chb.2020.106390",
      },
      {
        title: "Curate Your Feed",
        source: "Meier, Ann, and Leonard Reinecke (2022)",
        url: "https://doi.org/10.1089/cyber.2021.0324",
      },
    ],
  },
];

const ResearchLinks = () => {
  return (
    <div className="w-full p-5">
      {researchLinks.map((section, index) => (
        <div key={index} className="mb-5">
          <h3 className="text-xl font-bold mb-2">{section.category}</h3>
          <ul className="list-none p-0">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex} className="mb-2">
                <Link href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </Link>
                <span className="text-gray-600 text-sm"> — {link.source}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ResearchLinks;
