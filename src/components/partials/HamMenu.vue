<script setup>
import useUserStore from '../../store/User.js'

const { isLogged } = useUserStore()

const navItems = ['Home', 'Discover', 'Activities', 'About', 'Contact']
</script>

<template>
  <input type="checkbox" class="header__checkbox" id="nav-toggle" />
  <label for="nav-toggle" class="header__btn">
    <span class="header__icon">&nbsp;</span>
  </label>
  <aside class="sidebar">
    <!--Sidebar Navigation -->
    <nav class="nav">
      <!-- Navigation List 1 -->
      <ul class="nav__list">
        <li class="nav__list--auth" v-if="!isLogged.logged">
          <router-link class="auth__btn" to="/auth/login"> Login </router-link>
        </li>
        <li class="nav__list--auth" v-if="!isLogged.logged">
          <router-link class="auth__btn inline-block mb-4" to="/auth/register">
            Register
          </router-link>
        </li>
        <hr v-if="!isLogged.logged" />
        <li class="nav__list--item" v-for="(item, index) in navItems" :key="index">
          <router-link :to="`/auth/${item.toLowerCase()}`">{{ item }}</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped lang="postcss">
/* .header__btn */
.header__btn {
  background-color: white;
  border-radius: 8px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.2rem;
  width: 4.5rem;
  top: 1.5rem;
  right: 2.5rem;
  z-index: 400;
  text-align: center;
  cursor: pointer;
  display: none;

  @media screen and (max-width: 46.875em) {
    display: flex;
  }
}

/* .header__checkbox */
.header__checkbox {
  position: absolute;
  z-index: -9999999;
  top: 0.5rem;
  right: 5rem;
  transform: translate(1.5rem, 1.5rem);
  visibility: hidden;
  display: none;

  @media screen and (max-width: 46.875em) {
    display: inline-block;
  }
}

.header__checkbox:checked + .header__btn .header__icon::before {
  transform: translate(-50%) rotate(135deg);
}

.header__checkbox:checked + .header__btn .header__icon {
  background: transparent;
}

.header__checkbox:checked + .header__btn .header__icon::after {
  transform: translate(-50%) rotate(-135deg);
}

.header__checkbox:checked + .header__btn {
  border: none;
  box-shadow: none;
  background: none;
}

.header__checkbox:checked ~ .sidebar {
  z-index: 399;
  background-color: white;
  transition: 0.2s ease-in-out;
  padding-right: 4rem;
  width: 65%;
  right: -2rem;
  @media screen and (max-width: 34.375em) {
    width: 100%;
  }
}

/* .header__icon */
.header__icon {
  background-color: #3b82f6;
  width: 3rem;
  height: 0.2rem;
  align-items: center;
}

.header__icon::after,
.header__icon::before {
  background-color: white;
  content: '';
  display: inline-block;
  position: absolute;
  width: 3rem;
  height: 0.2rem;
  left: 50%;
  transition: 0.2s ease-in-out;
}

.header__icon::after {
  transform: translate(-50%, 0.9rem);
}

.header__icon::before {
  transform: translate(-50%, -0.9rem);
}

/* .sidebar */
.sidebar {
  font-size: 2.3rem;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.12);
  background-color: white;
  padding: 3.2rem 2.4rem;
  position: fixed;
  right: -99rem;
  top: 0;
  width: 0;
  transition: all 0.4s ease-in-out;
  height: 100vh;
  display: none;

  @media screen and (max-width: 46.875em) {
    display: block;
  }
}

/* .sidebar .nav */
.sidebar .nav {
  display: flex;
  flex-direction: column;
}

/* .sidebar .nav .nav__list */
.sidebar .nav .nav__list {
  display: flex;
  flex-direction: column;
  gap: 1 rem;
  transition: all 0.2s ease-in-out;
  margin-top: 2.5rem;
}

/* .sidebar .nav .nav__list--auth */
.sidebar .nav .nav__list--auth {
  padding: 1.3rem 2.4rem;
  position: relative;
  border-radius: 1.2rem;
}

/* .sidebar .nav .nav__list--item */
.sidebar .nav .nav__list--item {
  padding: 2rem 2.4rem;
  position: relative;
  border-radius: 1.2rem;
}

.sidebar .nav .nav__list--item::after {
  content: '';
  position: absolute;
  z-index: -1;
  border-radius: 1.2rem;
  background-color: rgb(59 130 246);
  inset: 0;
  scale: 1 0;
  transition: all 350ms;
  transform-origin: top;
}

.sidebar .nav .nav__list--item a {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.sidebar .nav .nav__list--item:hover a {
  color: white;
}

.sidebar .nav .nav__list--item:hover::after,
.sidebar .nav .nav__list--item:focus-visible::after {
  scale: 1 1;
  transform-origin: bottom;
}

.auth__btn {
  @apply text-blue-500;
}
</style>
