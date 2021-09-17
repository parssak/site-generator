import { PlaceholderValue } from "../types";

export const BASE_FILE_CONTENT = `<template>
  <Header title="${PlaceholderValue.TITLE}" />
  <Container>
    <h2>Content</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Curabitur eget nisl auctor, rhoncus nisl ut, aliquam erat.
    </p>
  </Container>
</template>

<script>
import Container from '@/components/base/Container';
import Header from '@/components/base/Header';
import * as data from '@/data';

export default {
  components: {
    Container,
    Header
  },
  setup() {
    return {
      data
    };
  }
};

</script>
`;

export const APP_FILE_CONTENT = `<template>
  <Nav />
  <router-view />
  <Footer />
</template>

<script>
import Footer from "@/components/base/Footer.vue";
import Nav from "@/components/nav/Nav.vue";

export default {
  components: { Nav, Footer },
};
</script>
`;

export const CONTAINER_CONTENT = `<template>
  <section
    :class="additionalClasses"
    class="py-4 md:py-8 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-full lg:max-w-7xl lg:mx-auto">
      <div class="relative md:p-6 w-full">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Container",
  data() {
    return {
      additionalClasses: this.full && "min-h-screen",
    };
  },
  props: {
    full: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

`;

export const HEADER_CONTENT = `<template>
  <div class="relative">
    <div class="absolute inset-0">
      <img
        class="w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
        alt=""
      />
      <div
        class="absolute inset-0 bg-accent mix-blend-multiply"
        aria-hidden="true"
      />
    </div>
    <Container>
      <div class="py-16">
        <h1
          class="
            text-4xl
            font-extrabold
            tracking-tight
            text-white
            sm:text-5xl
            capitalize
            lg:text-6xl
          "
        >
          {{ title }}
        </h1>
        <p v-if="description" class="mt-6 text-xl text-indigo-100 max-w-3xl">
          {{ description }}
        </p>
      </div>
    </Container>
  </div>
</template>

<script>
import Container from "@/components/base/Container.vue";
export default {
  components: { Container },
  name: "Header",
  props: {
    title: String,
    description: String,
  },
};
</script>
`;

export const NAV_CONTENT = `<template>
  <Popover class="fixed left-0 w-full top-0 z-20 bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div
        class="
          flex
          justify-between
          items-center
          py-6
          md:justify-start md:space-x-5
        "
      >
        <div class="flex justify-start lg:w-0 flex-1">
          <router-link to="/">
            <span class="sr-only">Company Name</span>
            <div class="flex items-center">
              <img
                class="h-9 w-auto"
                src="@/assets/logo.svg"
                alt="Company Name"
              />
            </div>
          </router-link>
        </div>
        <div class="-mr-2 -my-2 md:hidden">
          <PopoverButton
            class="
              rounded-md
              p-2
              inline-flex
              items-center
              justify-center
              text-white
              hover:text-gray-500
              transition
              hover:bg-white
            "
          >
            <span class="sr-only">Open menu</span>
            <MenuIcon class="h-6 w-6 text-accent" aria-hidden="true" />
          </PopoverButton>
        </div>
        <PopoverGroup
          as="nav"
          class="hidden md:flex space-x-3 lg:space-x-5 xl:space-x-7"
        >
          <NavItem
            v-for="item in navItems"
            :path="item.path"
            :key="item.label"
            :dropdownItems="item.dropdownItems"
          >
            {{ item.label }}
          </NavItem>
        </PopoverGroup>
      </div>
    </div>

    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <PopoverPanel
        focus
        class="
          absolute
          top-0
          inset-x-0
          z-10
          p-2
          transition
          transform
          origin-top-right
          md:hidden
        "
      >
        <div
          class="
            rounded-lg
            shadow-lg
            ring-1 ring-black ring-opacity-5
            bg-gray-200
            divide-y-2 divide-gray-50
          "
        >
          <div class="pt-5 pb-6 px-5">
            <div class="flex items-center justify-between">
              <router-link to="/">
                <img
                  class="h-5 w-auto"
                  src="@/assets/logo.svg"
                  alt="Company name"
                />
              </router-link>
              <div class="-mr-2">
                <PopoverButton
                  class="
                    rounded-md
                    p-2
                    inline-flex
                    items-center
                    justify-center
                    transition
                    hover:bg-accent-lightest
                  "
                >
                  <span class="sr-only">Close menu</span>
                  <XIcon class="h-6 w-6 text-accent" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
            <div class="mt-6">
              <nav class="grid gap-y-8">
                <router-link
                  v-for="item in navItems"
                  :key="item.label"
                  :to="item.path"
                  class="nav-item-mobile"
                >
                  <span class="nav-item-mobile__text">{{ item.label }}</span>
                </router-link>
              </nav>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
  <div style="margin-bottom: 4.5rem" />
</template>

<script>
import NavItem from "@/components/nav/NavItem.vue";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";

const navItems = [
  ${PlaceholderValue.NAV_ROUTES}
];
export default {
  components: {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    MenuIcon,
    XIcon,
    NavItem,
  },
  setup() {
    return { navItems };
  },
};
</script>

`;

export const NAVITEM_CONTENT = `<template>
  <div>
    <div
      v-if="dropdownItems && dropdownItems.length > 0"
      class="flex items-center -mr-2"
    >
      <Popover class="relative">
        <PopoverButton
          class="
            group
            rounded-md
            inline-flex
            items-center
            text-sm
            lg:text-base
            font-medium
            whitespace-nowrap
            transition
            hover:text-accent
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal,
          "
        >
          <router-link :to="path"><slot></slot></router-link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ml-2 h-5 w-5 group-transition"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </PopoverButton>

        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
        >
          <PopoverPanel
            class="
              absolute
              -ml-4
              mt-3
              transform
              z-10
              px-2
              w-screen
              max-w-md
              sm:px-0
              lg:ml-0 lg:left-1/2 lg:-translate-x-1/2
            "
          >
            <div
              class="
                rounded-lg
                shadow-lg
                ring-1 ring-black ring-opacity-5
                overflow-hidden
              "
            >
              <div
                class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8"
              >
                <router-link
                  v-for="item in dropdownItems"
                  :key="item.label"
                  :to="item.path"
                  class="
                    -m-3
                    p-3
                    flex
                    items-start
                    rounded-lg
                    transition
                    hover:bg-gray-50
                  "
                >
                  <p class="text-sm lg:text-base font-medium text-gray-900">
                    {{ item.label }}
                  </p>
                </router-link>
              </div>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
    </div>
    <div v-else class="nav-item">
      <router-link :to="path">
        <slot> </slot>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

export default {
  name: "NavItem",
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
  },
  props: {
    path: String,
    dropdownItems: {
      type: Array,
      required: false,
    },
  },
};
</script>
`;

export const FOOTER_CONTENT = `<template>
  <footer class="bg-white" aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="max-w-7xl mx-auto py-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 gap-8">
        <router-link to="/">
          <img class="h-9 w-auto" src="@/assets/logo.svg" alt="Company Name" />
        </router-link>
        <div class="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 class="mb-3">Navigation</h3>
            <div class="space-y-1">
              <router-link
                v-for="route in navigation"
                :key="route.label"
                class="
                  block
                  with-underline
                  w-max
                  transition
                  hover:text-accent
                  capitalize
                "
                :to="route.path"
                >{{ route.label }}</router-link
              >
            </div>
          </div>
          <div>
            <h3 class="mb-3">Contact Us</h3>
            <div class="space-y-4">
              <address class="not-italic">
                Street <br />
                City, Province POSTAL CODE
              </address>
              <a
                href="tel:+19056379255"
                class="block with-underline w-max hover:text-accent"
                >Phone: xxx-xxx-xxxx
              </a>
              <a
                href="mailto:info@teccweb.com"
                class="block with-underline w-max hover:text-accent"
                >Email: email@email.com</a
              >
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          mt-8
          pt-8
          border-t border-gray-200
          md:flex md:items-center md:justify-between
        "
      >
        <p class="text-base text-gray-400">
          &copy; Copyright 2021 Company Name
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
const navigation = [
  ${PlaceholderValue.FOOTER_ROUTES}
];
export default {
  setup() {
    return { navigation };
  },
};
</script>
`;

export const DATA_CONTENT = `import { getRoutes, getNavigation } from "@/data/utils";

const MASTER_ROUTES = [
${PlaceholderValue.DATA_ROUTES}
];

export const routes = getRoutes(MASTER_ROUTES);

export const navigation = getNavigation(MASTER_ROUTES);

export const posts = [
  {
    title: "Article Title",
    href: "/news/article",
    category: { name: "Article", href: "/news/article" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "6 min",
    author: {
      name: "Roel Aufderehar",
      href: "/news/article",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Article Title",
    href: "/news/article",
    category: { name: "Video", href: "/news/article" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa.",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    imageUrl:
      "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "4 min",
    author: {
      name: "Brenna Goyette",
      href: "/news/article",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Article Title",
    href: "/news/article",
    category: { name: "Case Study", href: "/news/article" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    imageUrl:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "/news/article",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Article Title",
    href: "/news/article",
    category: { name: "Article", href: "/news/article" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "6 min",
    author: {
      name: "Roel Aufderehar",
      href: "/news/article",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Article Title",
    href: "/news/article",
    category: { name: "Video", href: "/news/article" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa.",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    imageUrl:
      "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "4 min",
    author: {
      name: "Brenna Goyette",
      href: "/news/article",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Article Title",
    href: "/news/article",
    category: { name: "Case Study", href: "/news/article" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    imageUrl:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "/news/article",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Article Title",
    href: "/news/article",
    category: { name: "Article", href: "/news/article" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "6 min",
    author: {
      name: "Roel Aufderehar",
      href: "/news/article",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Article Title",
    href: "/news/article",
    category: { name: "Video", href: "/news/article" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa.",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    imageUrl:
      "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "4 min",
    author: {
      name: "Brenna Goyette",
      href: "/news/article",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Article Title",
    href: "/news/article",
    category: { name: "Case Study", href: "/news/article" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    imageUrl:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "/news/article",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

`;

