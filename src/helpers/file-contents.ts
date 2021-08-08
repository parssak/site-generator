import { PlaceholderValue } from "../types";

export const BASE_FILE_CONTENT =`
<template>
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
import Container from '@/components/Container';
import Header from '@/components/Header';

export default {
  components: {
    Container,
    Header
  }
};

</script>
`;

export const APP_FILE_CONTENT =`
<template>
  <Nav />
  <router-view />
  <Footer />
</template>

<script>
import Footer from "./components/Footer.vue";
import Nav from "./components/Nav.vue";

export default {
  components: { Nav, Footer },
};
</script>
`;

export const CONTAINER_CONTENT = `
<template>
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

export const HEADER_CONTENT = `
<template>
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
import Container from "./Container.vue";
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

export const NAV_CONTENT = `
<template>
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
import NavItem from "@/components/NavItem.vue";
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

export const NAVITEM_CONTENT = `
<template>
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

export const FOOTER_CONTENT = `
<template>
  <div class="footer">
    <!-- TODO -->
  </div>
</template>
`;