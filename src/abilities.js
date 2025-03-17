import { AbilityBuilder, Ability } from '@casl/ability';

export const defineAbilitiesFor = (user) => {
  const { can, rules } = new AbilityBuilder(Ability);

  if (user.role === 'admin') {
    can('manage', 'all');
  } else {
    can('read', 'all');
  }

  return new Ability(rules);
};
