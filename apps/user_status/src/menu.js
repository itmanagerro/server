/**
 * @copyright Copyright (c) 2020 Georg Ehrke
 *
 * @author Georg Ehrke <oc.list@georgehrke.com>
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import Vue from 'vue'
import { getRequestToken } from '@nextcloud/auth'
import UserStatus from './UserStatus'
import store from './store'
import Avatar from '@nextcloud/vue/dist/Components/Avatar'

// eslint-disable-next-line camelcase
__webpack_nonce__ = btoa(getRequestToken())

Vue.prototype.t = t
Vue.prototype.$t = t

const avatarDiv = document.getElementById('avatardiv-menu')
const propsData = {
	preloadedUserStatus: {
		message: avatarDiv.dataset.userstatus_message,
		icon: avatarDiv.dataset.userstatus_icon,
		status: avatarDiv.dataset.userstatus,
	},
	user: avatarDiv.dataset.user,
	displayName: avatarDiv.dataset.displayname,
	url: avatarDiv.dataset.avatar,
	disableMenu: true,
	disableTooltip: true,
}

const AvatarInMenu = Vue.extend(Avatar)
new AvatarInMenu({ propsData }).$mount('#avatardiv-menu')

// Register settings menu entry
export default new Vue({
	el: 'li[data-id="user_status-menuitem"]',
	// eslint-disable-next-line vue/match-component-file-name
	name: 'UserStatusRoot',
	render: h => h(UserStatus),
	store,
})

// Register dashboard status
document.addEventListener('DOMContentLoaded', function() {
	if (!OCA.Dashboard) {
		return
	}

	OCA.Dashboard.registerStatus('status', (el) => {
		const Dashboard = Vue.extend(UserStatus)
		return new Dashboard({
			propsData: {
				inline: true,
			},
			store,
		}).$mount(el)
	})
})
