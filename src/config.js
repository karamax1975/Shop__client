export const config = {
  _CURRENCY: 'Euro',
  _CURRENCY_SIGN: '€'
}

export class modelProduct {
  name = '';
  description = '';
  brand = '';
  category = [{ name: '' }];
  prise = '';
  preview = '';
  previews = [];
  shortDescription = '';
  details = [];
  promotion = {
    discount: null,
    promo: []
  }

}
export const template = {
  name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ligula nunc aliquet maecenas tellus placerat purus.',
  shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec curabitur euismod et, elementum congue enim commodo mattis et. Commodo morbi amet, lacinia dignissim lacus. Ligula nunc aliquet maecenas tellus placerat purus suspendisse.',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque faucibus ante dictumst tellus tempus faucibus habitasse viverra placerat. Et semper adipiscing at eget at. Fusce nulla hac nunc felis, libero eget lectus imperdiet pellentesque. Nibh morbi ut phasellus id dictum consequat, gravida. Eget sit sed eros, sed quis arcu, aliquam. Nec netus metus sem tellus sit ipsum. Tortor, lobortis pellentesque mattis nibh pharetra, ut. Facilisis in cursus morbi eu. Massa ultrices dui aenean vivamus cursus erat. Sed rhoncus, nisl adipiscing urna odio viverra ac nibh. Vel adipiscing magna natoque aliquam aliquam cras sapien, aliquam elit. Quam sit urna, a egestas. Sit nisi, sapien, aliquam cursus lectus. Elementum at augue enim lorem tristique dignissim varius libero. Velit sit ipsum nunc, odio elit auctor eleifend tincidunt nunc. Sit suspendisse varius id pellentesque eget eu. Malesuada rhoncus mi tincidunt hac justo. Mauris sed dictum tincidunt euismod vulputate mauris, mauris. Mattis ut neque tempus, posuere nunc. Sit libero purus nec vel orci, lacus. Habitasse sit elementum arcu sed.',
  prise: 999.99,
  brand: 'Brand product',
}

