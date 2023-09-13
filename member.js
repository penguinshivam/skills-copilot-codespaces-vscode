function skillsMember()
{
    var member = this;
    var skills = {};
    var skillsList = [];
    var skillsIndex = {};

    member.skills = function()
    {
        return skills;
    };

    member.skillsList = function()
    {
        return skillsList;
    };

    member.skillsIndex = function()
    {
        return skillsIndex;
    };

    member.addSkill = function(skill)
    {
        skills[skill.id] = skill;
        skillsList.push(skill);
        skillsIndex[skill.id] = skillsList.length - 1;
    };

    member.removeSkill = function(skill)
    {
        delete skills[skill.id];

        var index = skillsIndex[skill.id];
        skillsList.splice(index, 1);
        delete skillsIndex[skill.id];
    };

    member.hasSkill = function(skillId)
    {
        return skills[skillId] !== undefined;
    };

    member.skill = function(skillId)
    {
        return skills[skillId];
    };

    member.skillIndex = function(skillId)
    {
        return skillsIndex[skillId];
    };

    member.hasSkills = function(skillIds)
    {
        var result = true;
        for (var i = 0; i < skillIds.length; i++)
        {
            var skillId = skillIds[i];
            if (!member.hasSkill(skillId))
            {
                result = false;
                break;
            }
        }
        return result;
    };

    member.hasAnySkills = function(skillIds)
    {
        var result = false;
        for (var i = 0; i < skillIds.length; i++)
        {
            var skillId = skillIds[i];
            if (member.hasSkill(skillId))
            {
                result = true;
                break;
            }
        }
        return result;
    };
}
